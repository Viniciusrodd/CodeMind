
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