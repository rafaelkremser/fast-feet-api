import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { DriversRepository } from '../repositories/drivers-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateDriverUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateDriverUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateDriverUseCase {
  constructor(
    private driversRepository: DriversRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async handle({
    cpf,
    password,
  }: AuthenticateDriverUseCaseRequest): Promise<AuthenticateDriverUseCaseResponse> {
    const driver = await this.driversRepository.findByCpf(cpf)

    if (!driver) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      driver.password
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: driver.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
