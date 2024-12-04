import { env } from '@/env/index'
import { appRoutes } from './http/routes'
import fastify from 'fastify'
import { ZodError } from 'zod'



export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "validation error.", issues: error.format() })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  } else {
    // TODO: Here we should log to an external took like DataDog/Newrelic/sentry
  }
  return reply.status(500).send({ message: "internal server error." })
})


