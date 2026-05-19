
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
            'model': ollamaConfig.models.qwen,
            'prompt': prompt,
            'stream': false
         });

         const result = typeof response.data === 'string'
            ? response.data
            : response.data.response;
         if(!result) throw new Error(`Empty response from AI model(${ ollamaConfig.models.qwen })`);

         return result.trim();
      }
      catch(error){
         console.error(`[AIService] Error while requesting local AI model(${ ollamaConfig.models.qwen }): `, getErrorMessage(error));
         throw new Error(`[AIService] Error while requesting local AI model(${ ollamaConfig.models.qwen })`);
      }
   };

};
export const ollamaClient: OllamaClient = new OllamaClient();