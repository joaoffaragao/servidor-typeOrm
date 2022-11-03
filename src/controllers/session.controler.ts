import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class SessionController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await UserService.login({ email, password });
    return res.json({ token });
  }
}

export default SessionController;
