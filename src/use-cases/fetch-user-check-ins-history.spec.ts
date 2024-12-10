import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { FetchUserChekInsHistoryUseCase } from "./fetch-user-check-ins-history"

let chekInsRepository: InMemoryCheckInRepository
let sut: FetchUserChekInsHistoryUseCase

describe("Fetch Check Ins Use Case", () => {
  beforeEach(() => {
    chekInsRepository = new InMemoryCheckInRepository()
    sut = new FetchUserChekInsHistoryUseCase(chekInsRepository)
  })

  it("should be able to fetch check ins history", async () => {
    await chekInsRepository.create({
      gym_Id: "gym-01",
      user_id: "user-01",
    })

    await chekInsRepository.create({
      gym_Id: "gym-02",
      user_id: "user-01",
    })

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1

    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_Id: "gym-01"}),
      expect.objectContaining({gym_Id: "gym-02"})
    ])

  })

  
  it("should be able to fetch paginated check ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      await chekInsRepository.create({
        gym_Id: `gym-${i}`,
        user_id: "user-01",
      })
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_Id: "gym-21"}),
      expect.objectContaining({gym_Id: "gym-22"})
    ])
  })
})