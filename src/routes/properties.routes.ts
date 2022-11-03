import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const routes = Router();

routes.get("", PropertyController.read);
routes.get("/:id", PropertyController.readOne);
routes.post(
  "",
  AuthMiddleware.tokenVerify,
  AuthMiddleware.admVerify,
  PropertyController.create
);

export default routes;
