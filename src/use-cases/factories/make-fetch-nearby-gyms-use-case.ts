import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyUseCase } from "../fetch-nearby-gyms"

export function makeFetchNearbyUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyUseCase(gymsRepository)

  return useCase
}