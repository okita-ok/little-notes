import dotenv from "dotenv";
import Fastify from "fastify";
import path from "path";
import v1Routes from "./routes/v1";

// ----- CONFIGURACAO -----
dotenv.config();

// path: /../logs/registro.log
const logFilePath = path.join(__dirname, "..", "logs", "registros.log");

const server = Fastify({
  logger: {
    file: logFilePath,
  },
});
const PORT = Number(process.env.PORT ?? 7123);

// ----- PLUGINS -----
server.register(v1Routes, { prefix: "/v1" });

// ----- EXECUCAO -----
server.listen({ port: PORT, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Servidor da API rodando no endereco ${address}`);
});
