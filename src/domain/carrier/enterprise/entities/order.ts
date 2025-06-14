import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { OrderStatus } from '../enums/order-status'

export interface OrderProps {
  status: OrderStatus
  recipientId: UniqueEntityID
  driverId: UniqueEntityID | null
  pickedUpAt: Date | null
  deliveredAt?: Date | null
  finishAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends AggregateRoot<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get status() {
    return this.props.status
  }

  get driverId() {
    return this.props.driverId
  }

  get pickedUpAt() {
    return this.props.pickedUpAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get finishAt() {
    return this.props.finishAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set recipientId(recipientId: UniqueEntityID) {
    this.props.recipientId = recipientId
    this.touch()
  }

  set status(status: OrderStatus) {
    this.props.status = status
    this.touch()
  }

  set driverId(driverId: UniqueEntityID | null) {
    this.props.driverId = driverId
    this.touch()
  }

  set pickedUpAt(date: Date | null) {
    this.props.pickedUpAt = date
    this.touch()
  }

  set deliveredAt(date: Date | null | undefined) {
    this.props.deliveredAt = date
    this.touch()
  }

  set finishAt(date: Date | null | undefined) {
    this.props.finishAt = date
    this.touch()
  }

  public assignToDriver(driverId: UniqueEntityID) {
    this.props.driverId = driverId
    this.props.status = OrderStatus.assigned
    this.touch()
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return order
  }
}
