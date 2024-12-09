import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"




interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  longitude: number
  latitude: number
}

interface CreateGymUseCaseResponse {
  user: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {
  }

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title
    })

    return {
      gym,
    }
  }
}

