import { FastifyReply, FastifyRequest } from "fastify";
import * as UserService from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./user.types";

export const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = await UserService.getAllUsers();
    return res.send(users);
  } catch (error) {
    req.log.error(error);
    return res.status(500).send({ message: "Erro ao buscar usuários." });
  }
};

export const getById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }
    return res.send(user);
  } catch (error) {
    req.log.error(error);
    return res.status(500).send({ message: "Erro ao buscar o usuário." });
  }
};

export const create = async (
  req: FastifyRequest<{ Body: CreateUserDto }>,
  res: FastifyReply
) => {
  try {
    const { email } = req.body;

    // verif se o email ja esta sendo utilizado
    const emailCheck = await UserService.findUserByEmail(email);
    if (emailCheck) {
      return res.status(400).send({ error: "Email já cadastrado." });
    }

    const user = await UserService.createUser(req.body);
    return res.status(201).send(user);
  } catch (error) {
    req.log.error(error);
    return res.status(500).send({ message: "Erro ao criar usuário." });
  }
};

export const update = async (
  req: FastifyRequest<{ Params: { id: string }; Body: UpdateUserDto }>,
  res: FastifyReply
) => {
  try {
    const { email } = req.body;

    // verif se o email ja esta sendo utilizado
    if (email) {
      const emailCheck = await UserService.findUserByEmail(email);
      if (emailCheck) {
        return res.status(400).send({ error: "Email já cadastrado." });
      }
    }

    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }
    return res.send(user);
  } catch (error) {
    req.log.error(error);
    return res.status(500).send({ message: "Erro ao atualizar usuário." });
  }
};

export const remove = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }
    return res.status(204).send();
  } catch (error) {
    req.log.error(error);
    return res.status(500).send({ message: "Erro ao remover usuário." });
  }
};
