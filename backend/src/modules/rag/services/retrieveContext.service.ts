
// imports
import { ObjectId } from "mongoose";

// import interfaces
import { RetrievedChunk } from "@rag/interfaces/rag.interface";

// import repositories
import { chunkRepository } from "@rag/repositories/chunk.repository";

// import services
import { generateEmbeddingService } from "@rag/services/generateEmbedding.service";


class RetrieveContextService {

   public async execute(projectId: string | ObjectId, input: string): Promise<RetrievedChunk[]> {
      if(!input) throw new Error("Input is required");

      // 1. embedding input
      const embedding = await generateEmbeddingService.execute(input);

      // 2. vector search
      const chunks = await chunkRepository.vectorSearch({
         projectId,
         embedding,
         topK: 3
      });

      // clean chunks
      const bestScore = chunks[0]?.score || 0;
      const cleanChunks = chunks.filter(chunk =>
         chunk.score >= 0.70 && chunk.score >= bestScore * 0.95 // min / máx
      ).map(chunk => ({
         _id: chunk._id,
         score: chunk.score,
         content: `
            [TYPE]
            ${chunk.metadata ? chunk.metadata.chunkType : 'fallback'}

            [NAME]
            ${chunk.metadata ? chunk.metadata.name : 'unknown'}

            [PARENT]
            ${chunk.metadata ? chunk.metadata.parent : 'none'}

            [CODE]
            ${chunk.content}
         `
      }));

      // 3. retorn context
      return cleanChunks;
   };

};
export const retrieveContextService: RetrieveContextService = new RetrieveContextService();