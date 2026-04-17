
// imports
import { ObjectId } from "mongoose";


// RAG interface
export interface IDocumentChunk {
   _id: string | ObjectId,
   documentId: string | ObjectId,
   projectId: string | ObjectId,
   content: string,
   embedding: number[],
   metadata: {
      type: string;
      chunkIndex: number;
      tokens: number;
   }
};