
// imports
import { ObjectId } from "mongoose";


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
   structuredAnalysis: string
   explanation: string,
   suggestions: string,
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