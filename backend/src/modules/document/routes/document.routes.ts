
// imports
import { Router } from "express";

// import controllers
import { documentController } from "@document/controllers/document.controller";

// import middlewares
import { handleValidation } from "@app/middlewares/handleValidation.middleware";
import { documentValidations } from "@app/middlewares/modulesMiddleware/document.middleware";

// export router
export const documentRoutes: Router = Router();


//// document routes - 5225


// create document
documentRoutes.post(
   '/document',
   documentValidations.creation(),
   handleValidation,
   documentController.createDocument
);

// get all documents
documentRoutes.get(
   '/documents',
   documentController.getAllDocuments
);

// get document by id
documentRoutes.get<{ id: string }>(
   '/document/:id',
   documentValidations.getById(),
   handleValidation,
   documentController.getDocumentById
);

// udpate document
documentRoutes.put<{ id: string }>(
   '/document/:id',
   documentValidations.update(),
   handleValidation,
   documentController.updateDocument
);

// delete document
documentRoutes.delete<{ id: string }>(
   '/document/:id',
   documentValidations.delete(),
   handleValidation,
   documentController.deleteDocument
);
