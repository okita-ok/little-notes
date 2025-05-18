import { FastifyPluginCallback } from "fastify";

const noteRoutes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get("/teste", async (req, res) => {
    return { hello: "note" };
  });
  done();
};

export default noteRoutes;
