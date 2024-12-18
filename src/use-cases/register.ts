import bcryptjs from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"




interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

// SOLID

// D - Dependecy Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {
  }

  async execute({
    email,
    name,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    // para desincriptografar precisa passar a passwor 
    const password_hash = await bcryptjs.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user
    }
  }
}

