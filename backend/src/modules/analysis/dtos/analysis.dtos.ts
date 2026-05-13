
// imports
import { ObjectId } from "mongoose";

// import interface
import { IInput, IChunksUsed, IOutput } from "@analysis/interfaces/analysis.interface";
import { IContext } from "@project/interfaces/project.interface";


// build analysis prompt
interface BuildAnalysisPromptDTO {
   projectContext: IContext;
   code: string;
   userContext?: string;
   ragContext: string;
};

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