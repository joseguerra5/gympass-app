import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface SearchGymUseCaseRequest {
  q: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {
  }

  async execute({
    q,
    page
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(q, page)

    return {
      gyms,
    }
  }
}

