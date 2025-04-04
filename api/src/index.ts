import dotenv from "dotenv";
import Fastify from "fastify";

// ----- CONFIGURACAO -----
dotenv.config();
const fastify = Fastify({
  logger: true,
});
const PORT = Number(process.env.PORT ?? 7123);

// ----- MIDDLEWARES -----
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Servidor da API rodando no endereco ${address}`);
});
