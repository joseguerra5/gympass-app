import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { GetUserMetricsUseCase } from "./get-user-metrics"

let chekInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe("Get user metrics Use Case", () => {
  beforeEach(() => {
    chekInsRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(chekInsRepository)
  })

  it("should be able get check ins count from metrics", async () => {
    await chekInsRepository.create({
      gym_Id: "gym-01",
      user_id: "user-01",
    })

    await chekInsRepository.create({
      gym_Id: "gym-02",
      user_id: "user-01",
    })

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    })

    expect(checkInsCount).toEqual(2)

  })
})