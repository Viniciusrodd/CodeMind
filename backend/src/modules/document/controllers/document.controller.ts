
// imports
import { Request, Response } from "express";
import { ObjectId } from "mongoose";

// import interfaces
import { iApiResponse } from "@typesGlobal/apiResponse.interface";
import { IDocument } from "@document/interfaces/document.interface";

// import services
import { documentService } from "@document/services/document.service";

// import DTOs
import { CreateDocumentDTO, UpdateDocumentDTO } from "@document/dtos/document.dtos";

// import utils
import { getErrorMessage } from "@utils/errorHandler.util";


class DocumentController {

   // create document
   public async createDocument(
      req: Request<{}, {}, CreateDocumentDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const document: IDocument = await documentService.createDocument(req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ Document successfully created',
            data: document
         });
      }
      catch(error){
         console.error('❌ Internal server error at document creation: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at document creation',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

};
export const documentController: DocumentController = new DocumentController();