import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repositories"
import { SearchGymUseCase } from "./search-gym"
import { title } from "process"

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe("Search Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it("should be able to search gym", async () => {
    await gymsRepository.create({

      title: "Jhon Doe Gym",
      latitude: 41.2090368,
      longitude: -8.6278144,
      phone: "13123123131",
      description: "ushahsahuasuh"
    })

    await gymsRepository.create({
      title: "JavaScript Gym",
      latitude: 41.2090368,
      longitude: -8.6278144,
      phone: "13123123131",
      description: "ushahsahuasuh"
    })

    const { gyms } = await sut.execute({
      q: "Jhon",
      page: 1

    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Jhon Doe Gym" }),
    ])
  })

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym ${i}`,
        latitude: 41.2090368,
        longitude: -8.6278144,
        phone: "13123123131",
        description: "ushahsahuasuh"
      })
    }

    const { gyms } = await sut.execute({
      q: "gym",
      page: 2

    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym 21" }),
      expect.objectContaining({ title: "gym 22" })
    ])
  })
})