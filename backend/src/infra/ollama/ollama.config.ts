
// ollama config
export const ollamaConfig = {
   baseUrl: "http://localhost:11434",
   generatePath: "/api/generate",
   models: {
      mistral: 'mistral',
      qwen: 'qwen2.5-coder:3b'
   } 
};

// ollama embeddings config
export const ollamaEmbeddingsConfig = {
   path: 'http://localhost:11434/api/embed',
   model: 'nomic-embed-text'
};