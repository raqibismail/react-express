import { Router } from "express";
import userRoutes from "./UserRoutes";
import postRoutes from "./PostRoutes";
import authRoutes from "./AuthRoutes";

const router = Router();

// Define all routes here - similar to Laravel's api.php
const routes = [
  { path: "/users", router: userRoutes },
  { path: "/posts", router: postRoutes },
  { path: "/auth", router: authRoutes },
];

// Register all routes dynamically
routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
