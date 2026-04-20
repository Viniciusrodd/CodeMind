
// import interfaces
import { RetrievedChunk } from "@rag/interfaces/rag.interface";

// import services
import { GenerateEmbeddingService } from "@rag/services/generateEmbedding.service";


export class RetrieveContextService {

   constructor(
      private generateEmbeddingService: GenerateEmbeddingService,
      private chunkRepository: any
   ){}

   public async execute(projectId: string, input: string): Promise<RetrievedChunk[]> {
      if(!input) throw new Error("Input is required");

      // 1. embedding input
      const embedding = await this.generateEmbeddingService.execute(input);

      // 2. vector search
      const chunks = await this.chunkRepository.vectorSearch({
         projectId,
         embedding,
         topK: 5
      });

      // 3. retorn context
      return chunks;
   };

};