import { DomainEvents } from '@/core/events/domain-events'
import { DriversRepository } from '@/domain/carrier/application/repositories/drivers-repository'
import { Driver } from '@/domain/carrier/enterprise/entities/driver'

export class InMemoryDriversRepository implements DriversRepository {
  public items: Driver[] = []

  async findByCpf(cpf: string) {
    const driver = this.items.find((item) => item.cpf === cpf)

    if (!driver) {
      return null
    }

    return driver
  }

  async create(driver: Driver) {
    this.items.push(driver)

    DomainEvents.dispatchEventsForAggregate(driver.id)
  }
}
