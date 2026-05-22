
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
   structuredAnalysis: string;
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