import { Driver } from '../../enterprise/entities/driver'

export abstract class DriversRepository {
  abstract findByCpf(cpf: string): Promise<Driver | null>
  abstract create(driver: Driver): Promise<void>
}
