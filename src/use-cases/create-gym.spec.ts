import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repositories"
import { CreateGymUseCase } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Create gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryUsersRepository()
    sut = new CreateGymUseCase(gymsRepository)

  })

  it("should be able to create gym", async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const { user } = await registerUseCase.execute({
      name: "Jhon Doe",
      email: "Jhondoe@example.com",
      password: "123456"
    })

    expect(user.id).toEqual(expect.any(String))
  })

})