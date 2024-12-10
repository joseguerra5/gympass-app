import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserChekInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserChekInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserChekInsHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({userId, page}: FetchUserChekInsHistoryUseCaseRequest): Promise<FetchUserChekInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
   
    return {
      checkIns
    }
  }
}