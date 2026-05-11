
// import services
import { documentChunkService } from "@rag/services/chunkDocument.service";
import { generateEmbeddingService } from "@rag/services/generateEmbedding.service";

// import repositories
import { chunkRepository } from "@rag/repositories/chunk.repository";

// import interfaces
import type { Chunk } from "@rag/interfaces/rag.interface";

// import DTOs
import { DocumentInfosDTO } from "@rag/dtos/rag.dtos";


class DocumentChunkUseCase {

   public async create(document: DocumentInfosDTO) {
      // 1. break in chunks
      const chunks: Chunk[] = documentChunkService.execute(document.content);

      // 2. embeddings generation + save
      for(const chunk of chunks){
         const embedding = await generateEmbeddingService.execute(chunk.content);

         await chunkRepository.create({
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
export const documentChunkUseCase: DocumentChunkUseCase = new DocumentChunkUseCase();