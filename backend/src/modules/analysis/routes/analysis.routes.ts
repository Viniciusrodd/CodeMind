
// imports
import { Router } from "express";

// import controllers
import { analysisController } from "@analysis/controllers/analysis.controller";

// import middlewares
import { handleValidation } from "@app/middlewares/handleValidation.middleware";
import { analysisValidations } from "@app/middlewares/modulesMiddleware/analysis.middleware";

// export router
export const analysisRoutes: Router = Router();


//// analysis routes - 5225


// create analyse
analysisRoutes.post(
   '/',
   analysisValidations.creation(),
   handleValidation,
   analysisController.createAnalysis
);

// get analyse by id
analysisRoutes.get<{ id: string }>(
   '/:id',
   analysisValidations.getById(),
   handleValidation,
   analysisController.getAnalyseById
);

// get analyse by project id
analysisRoutes.get<{ projectId: string }>(
   '/:projectId',
   analysisValidations.getByProjectId(),
   handleValidation,
   analysisController.getAnalyseByProjectId
);

// delete analyse
analysisRoutes.get<{ id: string }>(
   '/:id',
   analysisValidations.delete(),
   handleValidation,
   analysisController.deleteAnalyse
);