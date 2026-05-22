
// imports
import { Router } from "express";

// import controllers
import { userController } from "@user/controllers/user.controller";

// import middlewares
import { handleValidation } from "@app/middlewares/handleValidation.middleware";
import { userValidations } from "@app/middlewares/modulesMiddleware/user.middleware";

// export router
export const userRoutes: Router = Router();


//// user routes - 5225


// create user
userRoutes.post(
   '/',
   userValidations.creation(),
   handleValidation,
   userController.createUser
);

// get user
userRoutes.get(
   '/',
   userController.getUser
);

// update user
userRoutes.put(
   '/',
   userValidations.creation(),
   handleValidation,
   userController.updateUser
);

// delete user
userRoutes.delete(
   '/',
   userController.deleteUser
);