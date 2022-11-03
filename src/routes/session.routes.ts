import { Router } from "express";
import { SessionController } from "../controllers/session.controler";
const routes = Router();

routes.post("", SessionController.login);

export default routes;
