import { AuthenticateDriverUseCase } from './authenticate-driver'
import { InMemoryDriversRepository } from 'test/repositories/in-memory-drivers-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeDriver } from 'test/factories/make-driver'

let inMemoryDriversRepository: InMemoryDriversRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateDriverUseCase

describe('Authenticate Driver', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    inMemoryDriversRepository = new InMemoryDriversRepository()
    sut = new AuthenticateDriverUseCase(
      inMemoryDriversRepository,
      fakeHasher,
      fakeEncrypter
    )
  })

  it('should be able to authenticate a driver', async () => {
    const driver = makeDriver({
      cpf: '11111111111',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryDriversRepository.items.push(driver)

    const result = await sut.handle({
      cpf: '11111111111',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
