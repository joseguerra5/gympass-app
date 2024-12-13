
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { FetchUserChekInsHistoryUseCase } from "../fetch-user-check-ins-history"

export function makeFetchUserChekInsHistoryUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserChekInsHistoryUseCase(checkInRepository)

  return useCase
}