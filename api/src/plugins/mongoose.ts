import fp from "fastify-plugin";
import mongoose from "mongoose";
import { FastifyInstance } from "fastify";

const connectDB = async (fastify: FastifyInstance) => {
  try {
    await mongoose.connect("mongodb://mongo:27017/notes");
    console.log("🟢 Mongoose conectado com sucesso");
  } catch (err) {
    console.error("🔴 Erro ao conectar o mongoose:", err);
    process.exit(1);
  }
};

export default fp(connectDB);
