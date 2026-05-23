
// imports
import { ObjectId, ClientSession, DeleteResult } from "mongoose";

// import DTOS
import { CreateDocumentChunkDTO } from "@rag/dtos/rag.dtos";


// chunk type
export type ChunkType =
   | 'class'
   | 'method'
   | 'function'
   | 'interface'
   | 'type'
   | 'fallback';

// chunk metadata
export type Chunk = {
   content: string;
   metadata: {
      chunkIndex: number;
      tokens: number;
      documentType?: "code" | "doc" | "fallback";
      chunkType: ChunkType;
      name?: string;
      parent?: string;
   }
};

// retrieved chunk type
export type RetrievedChunk = {
   _id: string | ObjectId;
   content: string;
   score: number;
   metadata?: {
      name?: string;
      parent?: string;
      chunkType: ChunkType;
   }
};

// RAG interface
export interface IDocumentChunk {
   _id: string | ObjectId,
   documentId: string | ObjectId,
   projectId: string | ObjectId,
   content: string,
   embedding: number[],
   metadata: {
      chunkIndex: number;
      tokens: number;
      documentType?: "code" | "doc" | "fallback";
      chunkType: ChunkType;
      name?: string;
      parent?: string;
   }
};

// vector search params
export interface IVectorSearchParams {
   projectId: string | ObjectId;
   embedding: number[];
   topK: number;
}

// document chunk repository
export interface IDocumentChunkRepository {
   create(data: CreateDocumentChunkDTO): Promise<IDocumentChunk>;
   delete(id: string | ObjectId): Promise<DeleteResult>;
   deleteAll(session: ClientSession): Promise<DeleteResult>;
   vectorSearch(params: IVectorSearchParams): Promise<RetrievedChunk[]>;
};