import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuxiliaryFunctions } from "../utils/functions";

export class UserController {
  static async read(req: Request, res: Response) {
    const allUsers = await UserService.getUserList();

    const users = allUsers.map((user) =>
      AuxiliaryFunctions.removePassword(user)
    );

    return res.json(users);
  }

  static async create(req: Request, res: Response) {
    const { email, name, password } = req.body;
    let { isAdm } = req.body;

    if (!isAdm) {
      isAdm = false;
    }

    const newUser = await UserService.createNewUser({
      email,
      name,
      password,
      isAdm,
    });

    const user = AuxiliaryFunctions.removePassword(newUser);

    return res.status(201).json(user);
  }

  static async update(req: Request, res: Response) {
    const { email, name, password } = req.body;
    const { id } = req.params;

    const editUser = await UserService.updateUser(id, {
      email,
      name,
      password,
    });

    const user = AuxiliaryFunctions.removePassword(editUser!);
    return res.status(200).json({ user });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await UserService.deleteUser(id);
    return res.status(204).json({ message: "deletado" });
  }
}
