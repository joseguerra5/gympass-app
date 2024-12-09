import { Gym, Prisma } from "@prisma/client"

// sempre começar pela interface
export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}