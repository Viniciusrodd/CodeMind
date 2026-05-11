
// imports
import { ObjectId } from "mongoose";

// import repositories
import { documentRepository } from "@document/repositories/document.repository";

// import use cases
import { documentChunkUseCase } from "@rag/useCases/documentChunk.usecase";

// import DTOs
import { CreateDocumentDTO, UpdateDocumentDTO } from "@document/dtos/document.dtos";

// import interfaces
import { IDocument } from "@document/interfaces/document.interface";


class DocumentUseCase {

   // create
   public async create(data: CreateDocumentDTO): Promise<IDocument> {
      if(!data.projectId || !data.name || !data.type || !data.content){
         throw new Error('Todos os campos são obrigatórios');
      }

      // 1. document save
      const document: IDocument = await documentRepository.create(data);

      // 2. document chunk save
      await documentChunkUseCase.create({
         documentId: document._id,
         projectId: document.projectId,
         content: document.content,
         type: document.type
      });

      return document;
   };

   // update
   public async update(id: string | ObjectId, data: UpdateDocumentDTO): Promise<IDocument | null> {
      if(!id) throw new Error('A identificação do documento é obrigatória');

      // 1. update document
      const updatedDocument: IDocument | null = await documentRepository.update(id, data);

      // 2. if content changes -> update document chunks
      if(data.content){
         await documentChunkUseCase.delete(id);

         await documentChunkUseCase.create({
            documentId: updatedDocument!._id,
            projectId: updatedDocument!.projectId,
            content: updatedDocument!.content,
            type: updatedDocument!.type
         });
      }

      return updatedDocument;
   };

   // delete
   public async delete(id: string | ObjectId): Promise<void> {
      if(!id) throw new Error('A identificação do documento é obrigatória');

      // 1. document chunks delete
      await documentChunkUseCase.delete(id);

      // 2. document delete
      const result = await documentRepository.delete(id);
      
      if(!result.acknowledged || result.deletedCount === 0){
         throw new Error('Erro ao deletar documento')
      };
   }

};
export const documentUseCase: DocumentUseCase = new DocumentUseCase();