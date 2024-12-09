import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { CheckInUseCase } from "./check-in"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repositories"
import { Decimal } from "@prisma/client/runtime/library"

let chekInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    chekInsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(chekInsRepository, gymsRepository)

    vi.useFakeTimers()

    gymsRepository.items.push({
      id: "gym-01",
      title: "Jhon Doe Gym",
      latitude: new Decimal(41.2090368),
      longitude: new Decimal(-8.6278144),
      phone: "13123123131",
      description: "ushahsahuasuh"
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 41.2090368,
      userLongitude: -8.6278144
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

  it("should not be able to check in twice in the same day", async () => {
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 41.2090368,
      userLongitude: -8.6278144
    })

    await expect(() => sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 41.2090368,
      userLongitude: -8.6278144
    })).rejects.toBeInstanceOf(Error)

  })

  it("should be able to check in twice but in the diferent day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 41.2090368,
      userLongitude: -8.6278144
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 41.2090368,
      userLongitude: -8.6278144
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

  it("not should be able to check in on distant gym", async () => {

    await expect(() => sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 39.1723425,
      userLongitude: -8.3772502
    })).rejects.toBeInstanceOf(Error)

  })

})