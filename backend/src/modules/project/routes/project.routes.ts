
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
   '/project',
   projectValidations.creation(),
   handleValidation,
   projectController.createProject
);

// get all projects
projectRoutes.get(
   '/projects',
   projectController.getAllProjects
);

// get project by id
projectRoutes.get<{ id: string }>(
   '/project/:id',
   projectValidations.getById(),
   handleValidation,
   projectController.getProjectById
);

// update project
projectRoutes.put<{ id: string }>(
   '/project/:id',
   projectValidations.update(),
   handleValidation,
   projectController.updateProject
);

// delete project
projectRoutes.delete<{ id: string }>(
   '/project/:id',
   projectValidations.delete(),
   handleValidation,
   projectController.deleteProject
);