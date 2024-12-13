import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"

export function makeGetUserMetricsUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInRepository)

  return useCase
}