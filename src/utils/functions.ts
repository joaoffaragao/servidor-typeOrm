import { ObjectLiteral } from "typeorm";
import { IUser } from "../interfaces/users";

export class AuxiliaryFunctions {
  static removePassword(user: IUser): IUserNoPassword {
    const userNoPass: IUserNoPassword = { ...user };
    delete userNoPass.password;
    return userNoPass;
  }

  static formatNumber(frase: number): string {
    let newFrase: string;
    frase < 10 ? (newFrase = "0" + frase) : (newFrase = frase.toString());
    return newFrase;
  }
}

export interface IUserNoPassword extends ObjectLiteral {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  isActive: boolean;
}
