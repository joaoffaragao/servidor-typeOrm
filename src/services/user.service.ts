import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { IUserLogin, IUserRequest, IUserUpdate } from "../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

export class UserService {
  static async createNewUser({
    name,
    email,
    password,
    isAdm,
  }: IUserRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new AppError("User already exists", 400);
    }

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
      isAdm,
    });

    await userRepository.save(newUser);

    return newUser;
  }

  static async getUserData(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOne({
      where: {
        id,
      },
    });
  }

  static async getUserList() {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
  }

  static async updateUser(id: string, { name, password, email }: IUserUpdate) {
    const userRepository = AppDataSource.getRepository(User);

    await userRepository.update(id, { name, password, email });

    const editUser = userRepository.findOne({
      where: {
        id,
      },
    });

    return editUser;
  }

  static async deleteUser(id: string) {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const user = users.find((user) => user.id === id);

    if (!user?.isActive) {
      throw new AppError("user is already desactivated");
    }

    await userRepository.update(id, { isActive: false });
  }

  static async login({ email, password }: IUserLogin) {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new AppError("Wrong email/password", 403);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AppError("Wrong email/password", 403);
    }

    if (!user.isActive) {
      throw new AppError("User disable", 403);
    }

    const decoded = { id: user.id, isAdm: user.isAdm, email: user.email };
    const optiosn = {
      expiresIn: "1d",
      subject: user.id,
    };

    const token = jwt.sign(decoded, String(process.env.SECRET_KEY), optiosn);

    return token;
  }

  static async isActive(email: string) {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const user = users.find((user) => user.email === email);

    if (!user?.isActive) {
      throw new AppError("user is already desactivated", 403);
    }

    return true;
  }
}
