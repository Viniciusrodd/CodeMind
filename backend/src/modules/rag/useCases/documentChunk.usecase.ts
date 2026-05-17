
// imports
import { ObjectId } from "mongoose";

// import services
import { documentChunkService } from "@rag/services/chunkDocument.service";
import { generateEmbeddingService } from "@rag/services/generateEmbedding.service";

// import repositories
import { chunkRepository } from "@rag/repositories/chunk.repository";

// import interfaces
import { Chunk } from "@rag/interfaces/rag.interface";

// import DTOs
import { DocumentInfosDTO } from "@rag/dtos/rag.dtos";


class DocumentChunkUseCase {

   // create
   public async create(document: DocumentInfosDTO): Promise<void> {
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
               chunkIndex: chunk.metadata.chunkIndex,
               tokens: chunk.metadata.tokens,
               documentType: document.documentType,
               chunkType: chunk.metadata.chunkType,
               name: chunk.metadata.name ? chunk.metadata.name : '',
               parent: chunk.metadata.parent ? chunk.metadata.parent : '',
            }
         });
      }
   };

   // delete
   public async delete(id: string | ObjectId): Promise<void> {
      await chunkRepository.delete(id);
   };

};
export const documentChunkUseCase: DocumentChunkUseCase = new DocumentChunkUseCase();