import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gym-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searrchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { q, page } = searrchGymsQuerySchema.parse(request.params)

  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    q,
    page
  })


  return reply.status(200).send({
    gyms,
  })
}