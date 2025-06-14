import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DriverProps {
  name: string
  document: string
  password: string
}

export class Driver extends Entity<DriverProps> {
  get name() {
    return this.props.name
  }

  get document() {
    return this.props.document
  }

  get password() {
    return this.props.password
  }

  static create(props: DriverProps, id?: UniqueEntityID) {
    const driver = new Driver(props, id)

    return driver
  }
}
