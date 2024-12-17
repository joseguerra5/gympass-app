import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest"
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it("Should be albe to get user profile", async () => {

    const { token } = await createAndAuthenticateUser(app)

    const prifileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send()



    expect(prifileResponse.statusCode).toEqual(200)
    expect(prifileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "jhondoe@example.com",
      })
    )
  })
})