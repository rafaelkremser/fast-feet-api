import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DriverProps {
  name: string
  cpf: string
  password: string
}

export class Driver extends Entity<DriverProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  static create(props: DriverProps, id?: UniqueEntityID) {
    const driver = new Driver(props, id)

    return driver
  }
}
