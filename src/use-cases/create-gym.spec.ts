import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repositories"
import { CreateGymUseCase } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Create gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

  })

  it("should be able to create gym", async () => {
    const prismaUsersRepository = new InMemoryGymsRepository()
    const registerUseCase = new CreateGymUseCase(prismaUsersRepository)

    const { gym } = await registerUseCase.execute({
      description: "Some description",
      latitude: 41.3949073,
      longitude: -8.7138347,
      title: "JavaScript Gym",
      phone: "11111111"
    })

    expect(gym.id).toEqual(expect.any(String))
  })

})