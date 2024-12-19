import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Validate check in (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it("Should be albe to validate check in", async () => {

    const { token } = await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        description: "Some description",
        latitude: 41.3949073,
        longitude: -8.7138347,
        title: "JavaScript Gym",
        phone: "11111111"
      }
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      }
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send()


    expect(response.statusCode).toEqual(204)
  })
})