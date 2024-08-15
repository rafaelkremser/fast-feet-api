import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  name: string
  status: string
  driverId: UniqueEntityID
  finishAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends AggregateRoot<OrderProps> {
  get name() {
    return this.props.name
  }

  get status() {
    return this.props.status
  }

  get driverId() {
    return this.props.status
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

  set name(name: string) {
    this.props.name = name

    this.touch()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return order
  }
}
