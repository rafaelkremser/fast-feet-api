import { CreateOrderUseCase } from './create-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to create a order', async () => {
    const result = await sut.handle({
      driverId: 'author-01',
      name: 'First product',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrdersRepository.items[0]).toEqual(result.value?.order)
  })
})
