
// imports
import { ObjectId } from "mongoose";


// chunk type
export type Chunk = {
   content: string;
   chunkIndex: number;
   tokens: number;
};

// retrieved chunk type
export type RetrievedChunk = {
   content: string;
   score: number;
};

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