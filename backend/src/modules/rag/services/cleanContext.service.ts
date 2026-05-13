
// import interfaces
import { RetrievedChunk } from "@rag/interfaces/rag.interface";


class CleanContextService {

   public execute(chunks: RetrievedChunk[]): string {
      if(!chunks || chunks.length === 0) return '';

      return chunks
         .map((chunk, index) => `[CONTEXT ${index + 1}] ${chunk.content}`)
         .join('\n\n');
   };

};
export const cleanContextService: CleanContextService = new CleanContextService();