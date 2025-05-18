import { FastifyPluginAsync } from "fastify";
import userRoutes from "../../resources/user/user.router";
import noteRoutes from "../../resources/note/note.router";

const v1Routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(userRoutes, { prefix: "/user" });
  fastify.register(noteRoutes, { prefix: "/note" });
};

export default v1Routes;
