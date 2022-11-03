import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const routes = Router();

routes.get("", CategoryController.read);
routes.get("/:id/properties", CategoryController.readPropertiesByCatagory);
routes.post(
  "",
  AuthMiddleware.tokenVerify,
  AuthMiddleware.admVerify,
  CategoryController.create
);

export default routes;
