import { FastifyPluginCallback } from "fastify";
import * as UserController from "./user.controller";
import { createUserSchema, updateUserSchema } from "./user.schema";

const userRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/", UserController.getAll);

  fastify.get("/:id", UserController.getById);

  fastify.post("/", {
    preHandler: fastify.validate(createUserSchema),
    handler: UserController.create,
  });

  fastify.put("/:id", {
    preHandler: fastify.validate(updateUserSchema),
    handler: UserController.update,
  });

  fastify.delete("/:id", UserController.remove);

  done();
};

export default userRoutes;
