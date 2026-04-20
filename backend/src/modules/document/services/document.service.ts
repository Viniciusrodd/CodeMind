
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

   // get all documents
   public async getAllDocuments(): Promise<IDocument[] | null> {
      const documents: IDocument[] | null = await documentRepository.getAll();
      return documents;
   };

   // get document by id
   public async getDocumentById(id: string | ObjectId): Promise<IDocument | null> {
      if(!id) throw new Error('A identificação do documento é obrigatória');

      const document: IDocument | null = await documentRepository.getById(id);
      return document;
   };

   // update document
   public async updateDocument(id: string | ObjectId, data: UpdateDocumentDTO): Promise<IDocument | null> {
      if(!id) throw new Error('A identificação do documento é obrigatória');

      const document: IDocument | null = await documentRepository.update(id, data);
      return document;
   };

   // delete document
   public async deleteDocument(id: string | ObjectId): Promise<void> {
      if(!id) throw new Error('A identificação do documento é obrigatória');

      const result = await documentRepository.delete(id);

      if(!result.acknowledged || result.deletedCount === 0){
         throw new Error('Erro ao deletar documento')
      };
   };

};
export const documentService: DocumentService = new DocumentService();