import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it("Should be albe to search gyms", async () => {

    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Some description",
        latitude: 41.3949073,
        longitude: -8.7138347,
        title: "JavaScript Gym",
        phone: "11111111"
      })


    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Some description",
        latitude: 41.3949073,
        longitude: -8.7138347,
        title: "TypeScript Gym",
        phone: "11111111"
      })

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "JavaScript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send()


    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
  })
})