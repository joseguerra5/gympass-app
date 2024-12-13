
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { CheckInUseCase } from "../check-in"
import { ValidateCheckInUseCase } from "../validate-check-in"

export function makeValidateCheckInUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const checkInRepository = new PrismaCheckInsRepository()

  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}