import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { makeValidateCheckInUseCase } from "@/use-cases/factories/validate-check-in-use-case";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })


  const { checkInId } = createCheckInParamsSchema.parse(request.params)

  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId
  })


  return reply.status(204).send()
}