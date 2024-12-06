import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { InvalidCredentialsError } from "./errors/invalid-credential-error"
import { GetUserPorfileUseCase } from "./get-user-profile-use-case"
import { ResourceNotFound } from "./errors/resource-not-found-error"

let usersRepository: InMemoryUsersRepository
let sut: GetUserPorfileUseCase

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserPorfileUseCase(usersRepository)

  })

  it("should be able to get user profile", async () => {

    const createdUser = await usersRepository.create({
      name: "Jhon Doe",
      email: "Jhondoe@example.com",
      password_hash: await hash("123456", 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual("Jhon Doe")
  })

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })


})