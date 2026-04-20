
// import interfaces
import { IAIProvider } from "@ai/interfaces/ai.interface";

// import infra
import { ollamaClient } from "@ollama/ollama.client";


class OllamaProvider implements IAIProvider {

   public async generate(prompt: string): Promise<string> {
      return ollamaClient.request(prompt); 
   };

};
export const ollamaProvider: OllamaProvider = new OllamaProvider();