
// imports
import { Router } from "express";

// import controllers
import { projectController } from "@project/controllers/project.controller";

// import middlewares
import { handleValidation } from "@app/middlewares/handleValidation.middleware";
import { projectValidations } from "@app/middlewares/modulesMiddleware/project.middleware";

// export router
export const projectRoutes: Router = Router();


//// project routes - 5225


// create project
projectRoutes.post(
   '/',
   projectValidations.creation(),
   handleValidation,
   projectController.createProject
);

// get all projects
projectRoutes.get(
   '/',
   projectController.getAllProjects
);

// get project by id
projectRoutes.get<{ id: string }>(
   '/:id',
   projectValidations.getById(),
   handleValidation,
   projectController.getProjectById
);

// update project
projectRoutes.put<{ id: string }>(
   '/:id',
   projectValidations.update(),
   handleValidation,
   projectController.updateProject
);

// delete project
projectRoutes.delete<{ id: string }>(
   '/:id',
   projectValidations.delete(),
   handleValidation,
   projectController.deleteProject
);