import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { CheckInUseCase } from "./check-in"

let chekInsRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    chekInsRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(chekInsRepository)

  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01"
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

})