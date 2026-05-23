
// imports
import { ObjectId, DeleteResult, ClientSession } from "mongoose";

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
   public async delete(id: string | ObjectId): Promise<DeleteResult> {
      return documentChunkModel.deleteOne({ _id: id });
   };

   // delete all
   public async deleteAll(session: ClientSession): Promise<DeleteResult> {
      return documentChunkModel.deleteMany({}, { session });
   };

   // vector search
   public async vectorSearch(params: IVectorSearchParams): Promise<RetrievedChunk[]> {
      try{
         const result = await documentChunkModel.aggregate([
            {
               $vectorSearch: {
                  index: "vector_index",
                  queryVector: params.embedding,
                  path: "embedding",
                  numCandidates: 100,
                  limit: params.topK
               }
            },
            {
               $project: {
                  _id: 1,
                  content: 1,
                  score: { $meta: "vectorSearchScore" }
               }
            }
         ]);
   
         return result; 
      }
      catch(error){
         console.error('❌ Vector Search Error:', error);
         throw error;
      }
   };

};
export const chunkRepository: ChunkRepository = new ChunkRepository();