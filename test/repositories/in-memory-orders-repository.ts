import { DomainEvents } from '@/core/events/domain-events'
import { OrdersRepository } from '@/domain/carrier/application/repositories/orders-repository'
import { Order } from '@/domain/carrier/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  constructor(
  ) {}

  async create(order: Order) {
    this.items.push(order)

    DomainEvents.dispatchEventsForAggregate(order.id)
  }
}
