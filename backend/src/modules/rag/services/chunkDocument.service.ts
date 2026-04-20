
// import interfaces
import { Chunk } from "@rag/interfaces/rag.interface";

/*
future evolution:
- AST (code)
- Markdown-aware (docs)
- token real (tiktoken)
*/

export class DocumentChunkService {

   public execute(content: string): Chunk[] {
      if(!content) throw new Error("Content is required");

      const maxChunkSize = 500; // chars (for now)
      const chunks: Chunk[] = [];

      let index = 0;
      for(let i = 0; i < content.length; i += maxChunkSize){
         const slice = content.slice(i, i + maxChunkSize);

         chunks.push({
            content: slice,
            chunkIndex: index++,
            tokens: slice.length // approximation
         });
      }

      return chunks;
   };

};
export const documentChunkService: DocumentChunkService = new DocumentChunkService();