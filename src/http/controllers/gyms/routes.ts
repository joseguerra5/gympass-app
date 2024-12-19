import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  // todas as rotas que estão aqui vão ser chamadas automaticamente o verify
  app.addHook("onRequest", verifyJWT)
  /**Autenticate */
  app.get("/gyms/search", search)
  app.get("/gyms/nearby", nearby)

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create)
}