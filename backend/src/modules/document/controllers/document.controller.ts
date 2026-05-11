
// imports
import { Request, Response } from "express";
import { ObjectId } from "mongoose";

// import interfaces
import { iApiResponse } from "@typesGlobal/apiResponse.interface";
import { IDocument } from "@document/interfaces/document.interface";

// import use cases
import { documentUseCase } from "@document/useCases/document.usecase";

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
         const document: IDocument = await documentUseCase.create(req.body);

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

   // get all documents
   public async getAllDocuments(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const documents: IDocument[] | null = await documentService.getAllDocuments();

         return res.status(200).send({
            success: true,
            message: '✔️ Getting all documents with success',
            data: documents
         });
      }
      catch(error){
         console.error('❌ Internal server error at getting all documents: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at getting all documents',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // get document by id
   public async getDocumentById(
      req: Request<{id: string | ObjectId}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const document: IDocument | null = await documentService.getDocumentById(req.params.id);

         return res.status(200).send({
            success: true,
            message: '✔️ Getting document with success',
            data: document
         });
      }
      catch(error){
         console.error('❌ Internal server error at getting document: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at getting document',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // update document
   public async updateDocument(
      req: Request<{id: string | ObjectId}, {}, UpdateDocumentDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const document: IDocument | null = await documentService.updateDocument(req.params.id, req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ Update document with successfully',
            data: document
         });
      }
      catch(error){
         console.error('❌ Internal server error at update document: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at update document',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // delete document
   public async deleteDocument(
      req: Request<{id: string | ObjectId}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         await documentService.deleteDocument(req.params.id);

         return res.status(200).send({
            success: true,
            message: '✔️ Delete document with success',
         });
      }
      catch(error){
         console.error('❌ Internal server error at delete document: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at delete document',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

};
export const documentController: DocumentController = new DocumentController();