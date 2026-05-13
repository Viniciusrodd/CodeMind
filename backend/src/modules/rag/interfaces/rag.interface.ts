
// imports
import { ObjectId } from "mongoose";

// import DTOS
import { CreateDocumentChunkDTO } from "@rag/dtos/rag.dtos";


// chunk type
export type Chunk = {
   content: string;
   chunkIndex: number;
   tokens: number;
};

// retrieved chunk type
export type RetrievedChunk = {
   _id: string | ObjectId;
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

// vector search params
export interface IVectorSearchParams {
   projectId: string | ObjectId;
   embedding: number[];
   topK: number;
}

// document chunk repository
export interface IDocumentChunkRepository {
   create(data: CreateDocumentChunkDTO): Promise<IDocumentChunk>;

   vectorSearch(params: IVectorSearchParams): Promise<RetrievedChunk[]>;
};