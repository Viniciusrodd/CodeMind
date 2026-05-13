
// import interfaces
import { RetrievedChunk } from "@rag/interfaces/rag.interface";


class CleanContextService {

   public execute(chunks: RetrievedChunk[]): String {
      if(chunks.length == 0) throw new Error("Chunks is required");

      return chunks
         .map((chunk, index) => `[CONTEXT ${index + 1}] ${chunk.content}`)
         .join('\n\n');
   };

};
export const cleanContextService: CleanContextService = new CleanContextService();