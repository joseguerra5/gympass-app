import { Prisma, User } from "@prisma/client"

// sempre começar pela interface
export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}