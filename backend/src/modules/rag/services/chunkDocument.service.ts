
// import interfaces
import { Chunk } from "@rag/interfaces/rag.interface";

// import utils
import { traverseCode } from "@utils/traverse.util";


class DocumentChunkService {

   public execute(content: string): Chunk[] {
      if(!content) throw new Error("Content is required");

      try{
         const chunks = traverseCode(content);

         if(!chunks.length){
            return [{
               content,
               metadata: {
                  chunkIndex: 0,
                  tokens: content.length,
                  type: 'fallback'
               }
            }];
         }

         return chunks;
      }
      catch{
         // AST failed
         return [{
            content,
            metadata: {
               chunkIndex: 0,
               tokens: content.length,
               type: 'fallback'
            }
         }];
      }
   };

};
export const documentChunkService: DocumentChunkService = new DocumentChunkService();