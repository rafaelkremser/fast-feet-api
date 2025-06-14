import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface OrderDetailsProps {
  orderId: UniqueEntityID
  trackingCode: string
  status: string
  recipientId: UniqueEntityID
  recipientName: string
  address: string
  driverId: UniqueEntityID | null
  pickedUpAt: Date | null
  deliveredAt?: Date | null
  finishAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class OrderDetails extends ValueObject<OrderDetailsProps> {
  get orderId() {
    return this.props.orderId
  }

  get status() {
    return this.props.status
  }

  get address() {
    return this.props.address
  }

  get driverId() {
    return this.props.driverId
  }

  get recipientId() {
    return this.props.recipientId
  }

  get recipientName() {
    return this.props.recipientName
  }

  get pickedUpAt() {
    return this.props.pickedUpAt
  }

  get deliveredAt() {
    return this.props.deliveredAt ?? null
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt ?? null
  }

  static create(props: OrderDetailsProps) {
    return new OrderDetails(props)
  }
}
