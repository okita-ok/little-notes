import { FastifyPluginAsync } from "fastify";
import userRoutes from "./user.router";
// import productRoutes from "./product.routes";

const v1Routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(userRoutes);
  //   fastify.register(productRoutes);
};

export default v1Routes;
