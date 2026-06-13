
// input interface
export interface IInput {
   code: string,
   context: string
};

// chunksUsed interface
export interface IChunksUsed {
   chunkId: string,
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
   _id: string,
   projectId: string,
   input: IInput,
   ragContext: IChunksUsed[],
   output: IOutput,
   createdAt: Date
};

// analysis status interface
export interface IAnalysisStatus {
   status1: boolean,
   status2: boolean,
   status3: boolean,
};