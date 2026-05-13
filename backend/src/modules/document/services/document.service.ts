
// imports
import { ObjectId } from "mongoose";

// import repository
import { documentRepository } from "@document/repositories/document.repository";

// import interfaces
import { IDocument } from "@document/interfaces/document.interface";


class DocumentService {

   // get all documents
   public async getAllDocuments(): Promise<IDocument[] | null> {
      const documents: IDocument[] | null = await documentRepository.getAll();
      return documents;
   };

   // get document by id
   public async getDocumentById(id: string | ObjectId): Promise<IDocument | null> {
      const document: IDocument | null = await documentRepository.getById(id);
      return document;
   };

};
export const documentService: DocumentService = new DocumentService();