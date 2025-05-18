import { Schema, ValidatorProps, model } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  lastUpdated?: Date;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    min: [3, "Mínimo de 3 caracteres."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[\w\-\.]+@(?:[\w-]+\.)+[\w-]{2,}$/.test(v);
      },
      message: (props: ValidatorProps) =>
        `${props.value} não é um email válido.`,
    },
  },
  password: {
    type: String,
    required: true,
    min: [8, "Mínimo de 8 caracteres."],
    validate: {
      validator: function (v: string) {
        return /^(?=(?:.*[a-z]){1,})(?=(?:.*[A-Z]){1,})(?=(?:.*[0-9]){1,})(?=(?:.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(
          v
        );
      },
      message: "Padrão de senha inválido.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model("User", UserSchema);
export default UserModel;
