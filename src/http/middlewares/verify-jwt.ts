import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // busca o token no Header e valida se o token foi gerado por nossa aplicação de acordo com o JWT_SECRET
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" })
  }
}