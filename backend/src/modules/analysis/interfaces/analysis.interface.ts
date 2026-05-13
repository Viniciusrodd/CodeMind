
// imports
import { ObjectId, DeleteResult } from "mongoose";

// import DTOs
import { CreateAnalysisDTO } from "@analysis/dtos/analysis.dtos";


// input interface
export interface IInput {
   code: string,
   context: string
};

// chunksUsed interface
export interface IChunksUsed {
   chunkId: string | ObjectId,
   score: number
};

// output interface
export interface IOutput {
   explanation: string,
   problemsFound: string,
   suggestions: string,
   bestPractices: string
};

// analysis interface
export interface IAnalysis {
   _id: string | ObjectId,
   projectId: string | ObjectId,
   input: IInput,
   ragContext: IChunksUsed[],
   output: IOutput,
   createdAt: Date
};

// analysis repository
export interface IAnalysisRepository {
   create(data: CreateAnalysisDTO): Promise<IAnalysis>,
   getById(id: string | ObjectId): Promise<IAnalysis | null>,
   delete(id: string | ObjectId): Promise<DeleteResult>
};