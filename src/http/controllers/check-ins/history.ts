import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeFetchUserChekInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro

  const fetchUserChekInsHistoryUseCase = makeFetchUserChekInsHistoryUseCase()

  const { checkIns } = await fetchUserChekInsHistoryUseCase.execute({
    userId: request.user.sub,
    page
  })


  return reply.status(200).send({
    checkIns,
  })
}