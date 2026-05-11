
// import repositories
import { documentRepository } from "@document/repositories/document.repository";

// import use cases
import { documentChunkUseCase } from "@rag/useCases/documentChunk.usecase";

// import DTOs
import { CreateDocumentDTO } from "@document/dtos/document.dtos";

// import interfaces
import { IDocument } from "@document/interfaces/document.interface";


class DocumentUseCase {

   public async create(data: CreateDocumentDTO): Promise<IDocument> {
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

};
export const documentUseCase: DocumentUseCase = new DocumentUseCase();