
// ollama request
export interface IOllamaRequest {
   model: string;
   prompt: string;
   stream?: boolean;
};

// ollama response
export interface IOllamaResponse {
   response: string;
};