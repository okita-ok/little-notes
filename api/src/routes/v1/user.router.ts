import { FastifyPluginCallback } from "fastify";

const userRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/teste", async (request, reply) => {
    return { hello: "user" };
  });
  done();
};

export default userRoutes;
