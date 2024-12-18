import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create check in (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it("Should be albe to create check in", async () => {

    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        description: "Some description",
        latitude: 41.3949073,
        longitude: -8.7138347,
        title: "JavaScript Gym",
        phone: "11111111"
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: 41.3949073,
        longitude: -8.7138347
      })


    expect(response.statusCode).toEqual(201)
  })
})