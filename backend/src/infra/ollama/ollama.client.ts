
// imports
import axios from 'axios';

// import env
import dotenv from 'dotenv';
dotenv.config({});

// import utils
import { getErrorMessage } from '@utils/errorHandler.util';

// import interfaces
import { IOllamaRequest, IOllamaResponse } from '@ollama/ollama.interface';
import { ollamaConfig } from '@ollama/ollama.config';


class OllamaClient {

   public async request(data: IOllamaRequest): Promise<IOllamaResponse> {
      if(!data.prompt) throw new Error('Prompt for AI model request is necessary');
      if(!data.model) throw new Error('Model is a mandatory field');

      try{
         const response = await axios.post(ollamaConfig.baseUrl + process.env.OLLAMA_GENERATE_PATH as string, {
            'model': data.model,
            'prompt': data.prompt,
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