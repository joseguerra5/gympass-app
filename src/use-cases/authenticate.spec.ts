import { expect, describe, it } from "vitest"
import { AuthenticateUseCase } from "./authenticate"
import {  hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { InvalidCredentialsError } from "./errors/invalid-credential-error"

describe("Authenticate Use Case", () => {

  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: "Jhon Doe",
      email: "Jhondoe@example.com",
      password_hash: await hash("123456", 6)
    })

    const {user} = await sut.execute({
      email: "Jhondoe@example.com",
      password: "123456"
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect( () => 
      sut.execute({
        email: "Jhondoe@example.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: "Jhon Doe",
      email: "Jhondoe@example.com",
      password_hash: await hash("123456", 6)
    })

    await expect( () => 
      sut.execute({
        email: "Jhondoe@example.com",
        password: "1234567"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})