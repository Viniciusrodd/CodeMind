
// imports
import { ObjectId } from "mongoose";

// import interfaces
import { IDocumentChunkRepository, RetrievedChunk, IVectorSearchParams } from "@rag/interfaces/rag.interface";
import { IDocumentChunk } from "@rag/interfaces/rag.interface";

// import DTOS
import { CreateDocumentChunkDTO } from "@rag/dtos/rag.dtos";

// import models
import { documentChunkModel } from "@rag/schemas/rag.schema";


class ChunkRepository implements IDocumentChunkRepository {

   // create
   public async create(data: CreateDocumentChunkDTO): Promise<IDocumentChunk> {
      return documentChunkModel.create(data);
   };

   // delete
   public async delete(id: string | ObjectId): Promise<void> {
      await documentChunkModel.deleteOne({ _id: id });
   };

   // vector search
   public async vectorSearch(params: IVectorSearchParams): Promise<RetrievedChunk[]> {
      const result = await documentChunkModel.aggregate([
         {
            $vectorSearch: {
               index: "embedding_index",
               queryVector: params.embedding,
               path: "embedding",
               numCandidates: 100,
               limit: params.topK
            }
         },
         {
            $match: {
               projectId: params.projectId
            }
         },
         {
            $project: {
               content: 1,
               score: { $meta: "vectorSearchScore" }
            }
         }
      ]);

      return result; 
   };

};
export const chunkRepository: ChunkRepository = new ChunkRepository();