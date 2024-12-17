import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, latitude, longitude, phone, title } = createBodySchema.parse(request.body)

  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title
  })


  return reply.status(201).send()
}