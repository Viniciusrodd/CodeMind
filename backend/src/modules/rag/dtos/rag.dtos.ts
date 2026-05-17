
// imports
import { ObjectId } from "mongoose";

// import types
import { ChunkType } from "@rag/interfaces/rag.interface";


// create RAG
export interface CreateDocumentChunkDTO {
   documentId: string | ObjectId,
   projectId: string | ObjectId,
   content: string,
   embedding: number[],
   metadata: {
      chunkIndex: number;
      tokens: number;
      documentType: "code" | "doc" | "fallback";
      chunkType: ChunkType;
      name?: string;
      parent?: string;
   }
};

// relevant infos from document for break in chunks
export interface DocumentInfosDTO {
   documentId: string | ObjectId;
   projectId: string | ObjectId;
   content: string;
   documentType: "code" | "doc" | "fallback";
   chunkType?: ChunkType;
}