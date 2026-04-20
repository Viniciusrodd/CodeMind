
// ollama request
export interface IOllamaRequest {
   model: string;
   prompt: string;
};

// ollama response
export interface IOllamaResponse {
   response: string;
};