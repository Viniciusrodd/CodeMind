
// imports
import { ObjectId, DeleteResult, ClientSession } from "mongoose";

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
   explication: string,
   problemsFound: string[];
   suggestions: string[];
   goodPractices: string[];
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
   create(data: CreateAnalysisDTO): Promise<IAnalysis>;
   getById(id: string | ObjectId): Promise<IAnalysis | null>;
   getByProjectId(id: string | ObjectId): Promise<IAnalysis[] | null>;
   delete(id: string | ObjectId): Promise<DeleteResult>;
   deleteByProjectId(id: string | ObjectId, session: ClientSession): Promise<DeleteResult>;
   deleteAll(session: ClientSession): Promise<DeleteResult>;
};