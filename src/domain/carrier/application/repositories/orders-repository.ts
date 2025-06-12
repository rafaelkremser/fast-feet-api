import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '@/domain/carrier/enterprise/entities/order'
import { OrderDetails } from '@/domain/carrier/enterprise/entities/value-objects/order-details'

export abstract class OrdersRepository {
  abstract findById(id: string): Promise<Order | null>
  abstract findByIdWithDetails(id: string): Promise<OrderDetails | null>
  abstract findManyRecent(params: PaginationParams): Promise<Order[]>
  abstract save(order: Order): Promise<void>
  abstract create(order: Order): Promise<void>
  abstract delete(order: Order): Promise<void>
}
