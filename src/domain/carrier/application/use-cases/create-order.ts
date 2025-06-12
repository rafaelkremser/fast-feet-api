import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  clientName: string
  address: string
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async handle({
    clientName,
    address,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      clientName,
      address,
      status: 'Waiting',
      driverId: null,
    })

    await this.ordersRepository.create(order)

    return right({ order })
  }
}
