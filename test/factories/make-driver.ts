import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Driver,
  DriverProps,
} from '@/domain/carrier/enterprise/entities/driver'
// import { Injectable } from '@nestjs/common'

export function makeDriver(
  override: Partial<DriverProps> = {},
  id?: UniqueEntityID
) {
  const driver = Driver.create(
    {
      name: faker.person.firstName(),
      cpf: faker.string.numeric(11),
      password: faker.internet.password(),
      ...override,
    },
    id
  )

  return driver
}

// @Injectable()
// export class DriverFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaDriver(data: Partial<DriverProps> = {}): Promise<Driver> {
//     const driver = makeDriver(data)

//     await this.prisma.user.create({
//       data: PrismaDriverMapper.toPrisma(driver),
//     })

//     return driver
//   }
// }
