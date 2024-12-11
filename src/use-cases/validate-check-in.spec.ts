import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { ValidateCheckInUseCase } from "./validate-check-in"
import { ResourceNotFound } from "./errors/resource-not-found-error"

let chekInsRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe("Validate checkin Use Case", () => {
  beforeEach(() => {
    chekInsRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(chekInsRepository)

    vi.useFakeTimers()

  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able validate the check-in", async () => {

    const createdCheckIn = await chekInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(chekInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it("should not be able validate an inexistent check-in", async () => {

    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    const createdCheckIn = await chekInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id
      })
    ).rejects.toBeInstanceOf(Error)
  })

})