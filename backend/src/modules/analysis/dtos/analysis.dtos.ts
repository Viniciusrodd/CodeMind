
// imports
import { ObjectId } from "mongoose";

// import interface
import { IInput, IChunksUsed, IOutput } from "@analysis/interfaces/analysis.interface";


// get analysis
export interface GetAnalysisDTO { 
   _id: string | ObjectId,
   projectId: string | ObjectId,
   input: IInput,
   ragContext: IChunksUsed[],
   output: IOutput,
   createdAt: Date
};

// delete analysis
export interface DeleteAnalysisDTO {
   _id: string | ObjectId
};