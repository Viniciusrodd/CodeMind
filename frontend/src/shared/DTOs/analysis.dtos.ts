
// import interface
import type { IInput, IChunksUsed, IOutput } from "@interfaces/analysis.interface";
import type { IContext } from "@interfaces/project.interface";


// build analysis prompt
export interface BuildAnalysisPromptDTO {
   projectContext: IContext;
   code: string;
   userContext?: string;
   ragContext: string;
};

// create analysis
export interface CreateAnalysisDTO {
   projectId: string,
   input: IInput
};

// create analysis repository
export interface CreateAnalysisRepositoryDTO {
   projectId: string,
   input: IInput,
   ragContext: IChunksUsed[],
   output: IOutput
};