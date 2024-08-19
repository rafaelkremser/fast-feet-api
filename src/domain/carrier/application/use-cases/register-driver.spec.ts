import { RegisterDriverUseCase } from './register-driver'
import { InMemoryDriversRepository } from 'test/repositories/in-memory-drivers-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryDriversRepository: InMemoryDriversRepository
let fakeHasher: FakeHasher
let sut: RegisterDriverUseCase

describe('Register Driver', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    inMemoryDriversRepository = new InMemoryDriversRepository()
    sut = new RegisterDriverUseCase(inMemoryDriversRepository, fakeHasher)
  })

  it('should be able to register a driver', async () => {
    const result = await sut.handle({
      name: 'Jonh Doe',
      cpf: '111.111.111-11',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      driver: inMemoryDriversRepository.items[0],
    })
  })

  it('should hash driver password upon registration', async () => {
    const result = await sut.handle({
      name: 'Jonh Doe',
      cpf: '111.111.111-11',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryDriversRepository.items[0].password).toEqual(hashedPassword)
  })
})
