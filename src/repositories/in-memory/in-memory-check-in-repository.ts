//porta de entrada para qualquer operação no banco de dados todas as operaç~~oes tem que passar por aqi
import { Prisma, CheckIn } from "@prisma/client"
import { CheckInsRepository } from "../check-ins-repository"
import { randomUUID } from "crypto"


export class InMemoryCheckInRepository implements CheckInsRepository {
  public items: CheckIn[] = []

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