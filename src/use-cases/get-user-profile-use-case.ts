import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found-error";

interface GetUserPorfileUseCaseRequest {
  userId: string
}

interface GetUserPorfileUseCaseResponse {
  user: User
}

export class GetUserPorfileUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({ userId }: GetUserPorfileUseCaseRequest): Promise<GetUserPorfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound
    }

    return {
      user
    }
  }
}