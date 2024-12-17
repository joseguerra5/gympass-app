import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { history } from "./history";
import { metric } from "./metrics";
import { create } from "./create";
import { validate } from "./validate";
;

export async function checkInsRoutes(app: FastifyInstance) {
  // todas as rotas que estão aqui vão ser chamadas automaticamente o verify
  app.addHook("onRequest", verifyJWT)

  app.get("/check-ins/history", history)
  app.get("/check-ins/metrics", metric)

  app.post("/gyms/:gymId/check-ins", create)
  app.patch("/gyms/:checkInId/validate", validate)

}