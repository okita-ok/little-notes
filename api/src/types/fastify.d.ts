import "fastify";
import { Schema } from "joi";
import { FastifyRequest, FastifyReply } from "fastify";

export declare module "fastify" {
  interface FastifyInstance {
    validate(
      schema: Schema
    ): (req: FastifyRequest, res: FastifyReply) => Promise<void>;
  }
}
