
// imports
import { ObjectId } from "mongoose";

// import repository
import { documentRepository } from "@document/repositories/document.repository";

// import DTOs
import { CreateDocumentDTO, UpdateDocumentDTO } from "@document/dtos/document.dtos";

// import interfaces
import { IDocument } from "@document/interfaces/document.interface";


class DocumentService {

   // create document
   public async createDocument(data: CreateDocumentDTO): Promise<IDocument> {
      if(!data.projectId || !data.name || !data.type || !data.content){
         throw new Error('Todos os campos são obrigatórios');
      }

      const document: IDocument = await documentRepository.create(data);
      return document;
   };

};
export const documentService: DocumentService = new DocumentService();