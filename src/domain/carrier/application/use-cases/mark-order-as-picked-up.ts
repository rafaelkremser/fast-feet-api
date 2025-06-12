import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface MarkOrderAsPickedUpUseCaseRequest {
  orderId: string
  driverId: string
}

type MarkOrderAsPickedUpUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

@Injectable()
export class MarkOrderAsPickedUpUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async handle({
    orderId,
    driverId,
  }: MarkOrderAsPickedUpUseCaseRequest): Promise<MarkOrderAsPickedUpUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.status = 'PickedUp'
    order.driverId = new UniqueEntityID(driverId)
    order.pickedUpAt = new Date()

    await this.ordersRepository.save(order)

    return right({
      order,
    })
  }
}
