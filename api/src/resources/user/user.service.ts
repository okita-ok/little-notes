import { genSalt, hash } from "bcryptjs";
import UserModel from "./user.model";
import { CreateUserDto, UpdateUserDto } from "./user.types";

// faltando "saltear" as senhas

export const getAllUsers = () => {
  return UserModel.find();
};

export const getUserById = (id: string) => {
  return UserModel.findById(id);
};

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email: email });
};

export const createUser = async (user: CreateUserDto) => {
  const salt = await genSalt();
  const password = await hash(user.password, salt);
  return UserModel.create({ ...user, password });
};

export const updateUser = async (id: string, updatedUser: UpdateUserDto) => {
  if (updatedUser.password) {
    const salt = await genSalt();
    const password = await hash(updatedUser.password, salt);
    return UserModel.findByIdAndUpdate(
      id,
      { ...updatedUser, password },
      { new: true }
    );
  } else {
    return UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
  }
};

export const deleteUser = (id: string) => {
  return UserModel.findByIdAndDelete(id);
};
