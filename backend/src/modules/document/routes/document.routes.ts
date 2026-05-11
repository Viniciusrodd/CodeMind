
// imports
import { Router } from "express";

// import controllers
import { documentController } from "@document/controllers/document.controller";

// import middlewares
import { handleValidation } from "@app/middlewares/handleValidation.middleware";

// export router
export const documentRoutes: Router = Router();