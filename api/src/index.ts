import dotenv from "dotenv";
import Fastify from "fastify";
import path from "path";

import validatePlugin from "./plugins/validate";
import v1Routes from "./routes/v1";
import mongoose from "./plugins/mongoose";

// ----- CONFIGURACAO -----
dotenv.config();

// path: /../logs/registros.log
const logFilePath = path.join(__dirname, "..", "logs", "registros.log");

const server = Fastify({
  logger: {
    file: logFilePath,
  },
});
const PORT = Number(process.env.PORT ?? 7123);

// ----- START DO SERVIDOR -----
const start = async () => {
  try {
    // ----- PLUGINS -----
    await server.register(validatePlugin);
    await server.register(v1Routes, { prefix: "/v1" });
    await server.register(mongoose);

    // inicio do servidor
    const address = await server.listen({ port: PORT, host: "0.0.0.0" });

    console.log(`Servidor da API rodando no endereço ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
