import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search nearby gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it("Should be albe to create gym", async () => {

    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Some description",
        latitude: 41.3949073,
        longitude: -8.7138347,
        title: "JavaScript Gym",
        phone: "1111111111"
      })

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: 41.3949073,
        longitude: -8.7138347,
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})