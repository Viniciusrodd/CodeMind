
// imports
import axios from "axios";

// import ollama
import { ollamaEmbeddingsConfig } from "@ollama/ollama.config";

// import interfaces
import { IEmbeddingProvider } from "@embeddings/interfaces/embeddings.interface";


class OllamaEmbeddingsProvider implements IEmbeddingProvider {

   public async generate(text: string): Promise<number[]> {
      const response = await axios.post(ollamaEmbeddingsConfig.path, {
         model: ollamaEmbeddingsConfig.model,
         input: text
      });

      return response.data.embeddings[0];
   };

};
export const ollamaEmbeddingsProvider: OllamaEmbeddingsProvider = new OllamaEmbeddingsProvider();