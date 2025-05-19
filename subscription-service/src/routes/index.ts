import subscriptionRoutes from "./subscription";
import weatherRoutes from "./weather";
import { Express } from "express-serve-static-core";

const initRoutes = (app: Express) => {
  app.use("/api", subscriptionRoutes);
  app.use("/api/weather", weatherRoutes);
};

export { initRoutes };
