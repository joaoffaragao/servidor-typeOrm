import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import ErrorMiddleware from "./middleware/handleError.middlewere";
import propertiesRoutes from "./routes/properties.routes";
import categoryRoutes from "./routes/category.routes";
import schedulesRoutes from "./routes/schedules.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/properties", propertiesRoutes);
app.use("/categories", categoryRoutes);
app.use("/schedules", schedulesRoutes);

app.use(ErrorMiddleware.handle);

export default app;
