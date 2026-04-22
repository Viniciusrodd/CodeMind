
// imports
import { ObjectId } from "mongoose";


// create RAG
export interface CreateDocumentChunkDTO {
   documentId: string | ObjectId,
   projectId: string | ObjectId,
   content: string,
   embedding: number[],
   metadata: {
      type: string,
      chunkIndex: number,
      tokens: number,
   }
};

// relevant infos from document for break in chunks
export interface DocumentInfosDTO {
   documentId: string;
   projectId: string;
   content: string;
   type: string;
}