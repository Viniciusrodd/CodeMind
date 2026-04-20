
// import interfaces
import { IEmbeddingProvider } from "@embeddings/interfaces/embeddings.interface";


class GenerateEmbeddingService {

   constructor(
      private embeddingProvider: IEmbeddingProvider // like Ollama embedding...
   ){};

   async execute(text: string): Promise<number[]> {
      if(!text) throw new Error("Text is required for embedding");

      return this.embeddingProvider.generate(text);
   };

};