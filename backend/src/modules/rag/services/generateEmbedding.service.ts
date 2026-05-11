
// import providers
import { ollamaEmbeddingsProvider } from "@embeddings/providers/ollamaEmbeddings.provider";


class GenerateEmbeddingService {

   async execute(text: string): Promise<number[]> {
      if(!text) throw new Error("Text is required for embedding");

      return await ollamaEmbeddingsProvider.generate(text);
   };

};
export const generateEmbeddingService: GenerateEmbeddingService = new GenerateEmbeddingService();