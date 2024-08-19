import { UseCaseError } from '@/core/errors/use-case-error'

export class DriverAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Driver "${identifier}" already exists.`)
  }
}
