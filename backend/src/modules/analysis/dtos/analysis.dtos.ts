
// imports
import { ObjectId } from "mongoose";

// import interface
import { IInput, IChunksUsed, IOutput } from "@analysis/interfaces/analysis.interface";
import { IContext } from "@project/interfaces/project.interface";


// build analysis prompt
export interface BuildAnalysisPromptDTO {
   projectContext: IContext;
   code: string;
   userContext?: string;
   ragContext: String;
};

// create analysis
export interface CreateAnalysisDTO {
   projectId: string | ObjectId,
   input: IInput,
   ragContext: IChunksUsed[],
   output: IOutput
};