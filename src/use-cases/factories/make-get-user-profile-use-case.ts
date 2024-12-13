import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserPorfileUseCase } from "../get-user-profile-use-case"

export function makeGetUserProfileUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserPorfileUseCase(usersRepository)

  return useCase
}