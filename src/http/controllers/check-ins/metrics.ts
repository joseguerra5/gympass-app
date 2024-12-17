import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metric(request: FastifyRequest, reply: FastifyReply) {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })


  return reply.status(200).send({
    checkInsCount,
  })
}