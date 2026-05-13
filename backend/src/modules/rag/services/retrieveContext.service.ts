
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
         topK: 5
      });

      // 3. retorn context
      return chunks;
   };

};
export const retrieveContextService: RetrieveContextService = new RetrieveContextService();