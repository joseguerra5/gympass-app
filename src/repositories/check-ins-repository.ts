import { Prisma, CheckIn } from "@prisma/client"

// sempre começar pela interface
export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  CountByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}