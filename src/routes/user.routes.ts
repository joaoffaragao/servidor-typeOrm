import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const routes = Router();

routes.post("", UserController.create);
routes.get(
  "",
  AuthMiddleware.tokenVerify,
  AuthMiddleware.admVerify,
  UserController.read
);
routes.patch(
  "/:id",
  AuthMiddleware.tokenVerify,
  AuthMiddleware.userExist,
  AuthMiddleware.ownVerify,
  AuthMiddleware.uptadeVerify,
  UserController.update
);
routes.delete(
  "/:id",
  AuthMiddleware.tokenVerify,
  AuthMiddleware.userExist,
  AuthMiddleware.admVerify,
  AuthMiddleware.IsActiveUserVerify,
  UserController.delete
);

export default routes;
