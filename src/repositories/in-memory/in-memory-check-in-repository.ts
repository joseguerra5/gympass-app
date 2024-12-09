//porta de entrada para qualquer operação no banco de dados todas as operaç~~oes tem que passar por aqi
import { Prisma, CheckIn } from "@prisma/client"
import { CheckInsRepository } from "../check-ins-repository"
import { randomUUID } from "crypto"
import dayjs from "dayjs"


export class InMemoryCheckInRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date")
    const endOfTheDay = dayjs(date).endOf("date")
    const checkInSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInSameDate) {
      return null
    }

    return checkInSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {

    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }

    this.items.push(checkIn)

    return checkIn
  }


}