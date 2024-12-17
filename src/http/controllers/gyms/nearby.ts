import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeFetchNearbyUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.params)


  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro

  const createGymUseCase = makeFetchNearbyUseCase()

  const { gyms } = await createGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })


  return reply.status(200).send({
    gyms,
  })
}