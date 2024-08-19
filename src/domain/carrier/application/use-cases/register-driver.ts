import { Injectable } from '@nestjs/common'
import { Driver } from '../../enterprise/entities/driver'
import { DriverAlreadyExistsError } from './errors/driver-already-exists-error'
import { DriversRepository } from '../repositories/drivers-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { Either, left, right } from '@/core/either'

interface RegisterDriverUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type RegisterDriverUseCaseResponse = Either<
  DriverAlreadyExistsError,
  {
    driver: Driver
  }
>

@Injectable()
export class RegisterDriverUseCase {
  constructor(
    private driversRepository: DriversRepository,
    private hashGenerator: HashGenerator
  ) {}

  async handle({
    name,
    cpf,
    password,
  }: RegisterDriverUseCaseRequest): Promise<RegisterDriverUseCaseResponse> {
    const driverWithSameCpf = await this.driversRepository.findByCpf(cpf)

    if (driverWithSameCpf) {
      return left(new DriverAlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const driver = Driver.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.driversRepository.create(driver)

    return right({ driver })
  }
}
