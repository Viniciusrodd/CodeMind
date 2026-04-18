
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


// creation user
userRoutes.post(
   '/user',
   userValidations.creation(),
   handleValidation,
   userController.createUser
);

// get user
userRoutes.get(
   '/user',
   userController.getUser
);

// update user
userRoutes.put(
   '/user',
   userValidations.creation(),
   handleValidation,
   userController.updateUser
);

// delete user
userRoutes.delete(
   '/user',
   userController.deleteUser
);