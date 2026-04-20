
// imports
import axios from 'axios';

// import env
import dotenv from 'dotenv';
dotenv.config({});

// import utils
import { getErrorMessage } from '@utils/errorHandler.util';

// import interfaces
import { ollamaConfig } from '@ollama/ollama.config';


class OllamaClient {

   public async request(prompt: string): Promise<string> {
      if(!prompt) throw new Error('Prompt for AI model request is necessary');

      try{
         const response = await axios.post(ollamaConfig.baseUrl + ollamaConfig.generatePath, {
            'model': ollamaConfig.defaultModel,
            'prompt': prompt,
            'stream': false
         });

         const result = typeof response.data === 'string'
            ? response.data
            : response.data.response;
         if(!result) throw new Error('Empty response from AI model');

         return result.trim();
      }
      catch(error){
         console.error('[AIService] Error while requesting local AI model:', getErrorMessage(error));
         throw new Error('Failed to process AI model request');
      }
   };

};
export const ollamaClient: OllamaClient = new OllamaClient();