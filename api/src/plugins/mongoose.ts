import fp from "fastify-plugin";
import mongoose from "mongoose";
import { FastifyInstance } from "fastify";

const connectDB = async (fastify: FastifyInstance) => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 5000, // 5s de timeout
      heartbeatFrequencyMS: 5000, // 5s de freq para verificacao
    });

    mongoose.connection.on("error", (err) => {
      fastify.log.error("🔴 Erro no Mongoose após conectar:", err);
      console.error("🔴 Erro no Mongoose após conectar:", err);
      process.exit(1);
    });
    mongoose.connection.on("disconnected", () => {
      fastify.log.warn("⚠️ Mongoose foi desconectado do banco");
      console.log("⚠️ Mongoose foi desconectado do banco");
    });
    mongoose.connection.on("reconnected", () => {
      fastify.log.info("🔁 Mongoose reconectado.");
      console.log("🔁 Mongoose reconectado.");
    });

    fastify.log.info("🟢 Mongoose conectado com sucesso");
    console.log("🟢 Mongoose conectado com sucesso");
  } catch (err) {
    fastify.log.error("🔴 Erro ao conectar com o mongoose:", err);
    console.error("🔴 Erro ao conectar com o mongoose:", err);
    process.exit(1);
  }
};

export default fp(connectDB);
