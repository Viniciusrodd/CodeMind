
// imports
import { Router } from "express";

// import routes
import { userRoutes } from "@user/routes/user.routes";


// export router
export const routes: Router = Router();


// use routes
routes.use('/users', userRoutes);