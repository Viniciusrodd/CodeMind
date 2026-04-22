
// import services
import { DocumentChunkService } from "@rag/services/chunkDocument.service";
import { GenerateEmbeddingService } from "@rag/services/generateEmbedding.service";

// import interfaces
import { IDocumentChunkRepository } from "@rag/interfaces/rag.interface";
import type { Chunk } from "@rag/interfaces/rag.interface";

// import DTOs
import { DocumentInfosDTO } from "@rag/dtos/rag.dtos";


export class ProcessDocumentUseCase {

   constructor(
      private chunkService: DocumentChunkService,
      private embeddingService: GenerateEmbeddingService,
      private chunkRepository: IDocumentChunkRepository
   ){};


   public async execute(document: DocumentInfosDTO) {
      // 1. break in chunks
      const chunks: Chunk[] = this.chunkService.execute(document.content);

      // 2. embeddings generation + save
      for(const chunk of chunks){
         const embedding = await this.embeddingService.execute(chunk.content);

         await this.chunkRepository.create({
            documentId: document.documentId,
            projectId: document.projectId,
            content: chunk.content,
            embedding,
            metadata: {
               type: document.type,
               chunkIndex: chunk.chunkIndex,
               tokens: chunk.tokens
            }
         });
      }
   };

};