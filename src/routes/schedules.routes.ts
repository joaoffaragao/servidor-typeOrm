import { Router } from "express";
import { SchedulesController } from "../controllers/schedules.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { SchedulesMiddleware } from "../middleware/schedules.middleware";

const routes = Router();

routes.get(
  "/properties/:id",
  AuthMiddleware.tokenVerify,
  AuthMiddleware.admVerify,
  SchedulesController.readByProperty
);
routes.post(
  "",
  AuthMiddleware.tokenVerify,
  SchedulesMiddleware.dateVerify,
  SchedulesController.create
);

export default routes;
