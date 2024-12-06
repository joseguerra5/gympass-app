import { Prisma, CheckIn } from "@prisma/client"

// sempre começar pela interface
export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}