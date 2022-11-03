import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserService } from "../services/user.service";

export class AuthMiddleware {
  static async admVerify(req: Request, res: Response, next: NextFunction) {
    if (!req.user.isAdm) {
      return res.status(403).json({ message: "Not authorized" });
    }

    next();
  }

  static async userExist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = await UserService.getUserData(id);

    if (!user?.id) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  }

  static async tokenVerify(req: Request, res: Response, next: NextFunction) {
    const fullToken = req.headers.authorization;

    const token = fullToken?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    jwt.verify(
      token,
      String(process.env.SECRET_KEY),
      (error: any, decoded: any) => {
        if (error) {
          return res.status(401).json({ message: "Token is missing" });
        }

        const { id, email, isAdm } = decoded;

        req.user = {
          id,
          email,
          isAdm,
        };

        next();
      }
    );
  }

  static async IsActiveUserVerify(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const email = req.user.email;

    const isActive = await UserService.isActive(email!);

    if (!isActive) {
      return res.status(400).json({ message: "user is already desactivated" });
    }

    next();
  }

  static async uptadeVerify(req: Request, res: Response, next: NextFunction) {
    const { isAdm, isActive, id } = req.body;

    if (isAdm !== undefined || isActive !== undefined || id !== undefined) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    next();
  }

  static async ownVerify(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const isAdm = req.user.isAdm;
    const userId = req.user.id;

    if (!(id === userId || isAdm)) {
      return res.status(401).json({ message: `Not authorized` });
    }

    next();
  }
}
