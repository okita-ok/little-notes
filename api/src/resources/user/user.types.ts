import { User } from "./user.model";

export type CreateUserDto = Pick<User, "name" | "email" | "password">;

export type UpdateUserDto = Pick<User, "name" | "email" | "password">;

// export type UserDto = Omit<User, "password">;
