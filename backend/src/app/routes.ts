
// imports
import { Router } from "express";

// import routes
import { userRoutes } from "@user/routes/user.routes";
import { projectRoutes } from "@project/routes/project.routes";


// export router
export const routes: Router = Router();


// use routes
routes.use('/users', userRoutes);
routes.use('/projects', projectRoutes);