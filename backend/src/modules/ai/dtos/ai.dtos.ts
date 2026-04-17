
// generate ai response (system)
export interface GenerateResponseDTO {
   prompt: string;
   context?: string;
};

// ollama request + map
export interface OllamaRequestDTO {
   model: string;
   prompt: string;
   stream: boolean;
};
export const ollamaRequestMap = (data: GenerateResponseDTO): OllamaRequestDTO => {
   return {
      model: 'ollama',
      prompt: data.prompt,
      stream: false
   };
};