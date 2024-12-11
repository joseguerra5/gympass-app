import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repositories"
import { SearchGymUseCase } from "./search-gym"
import { FetchNearbyUseCase } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyUseCase

describe("Fetch nearby gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({

      title: "Near Gym",
      latitude: 41.2090368,
      longitude: -8.6278144,
      phone: "13123123131",
      description: "ushahsahuasuh"
    })

    await gymsRepository.create({
      title: "far Gym",
      latitude: 41.3949073,
      longitude: -8.7138347,
      phone: "13123123131",
      description: "ushahsahuasuh"
    })

    const { gyms } = await sut.execute({
      userLatitude: 41.2090368,
      userLongitude: -8.6278144

    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ])
  })
})