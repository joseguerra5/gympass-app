import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      email,
      name,
      password
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()  // TODO: fix me
  }


  return reply.status(201).send()
}