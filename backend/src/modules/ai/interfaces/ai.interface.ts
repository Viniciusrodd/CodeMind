
// ai provider
export interface IAIProvider {
   generate(prompt: string): Promise<string>;
};