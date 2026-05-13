
// import models
import { documentChunkModel } from "@rag/schemas/rag.schema";


class SetupVectorIndex {

   public async create() {
      try{
         // check index existence
         const indexes = await documentChunkModel.listSearchIndexes();
         const vectorIndexExists = indexes.some(idx => idx.name === 'vector_index');

         if(!vectorIndexExists){
            await documentChunkModel.createSearchIndex({
               name: 'vector_index',
               type: 'vectorSearch',
               definition: {
                  fields: [
                     {
                        type: 'vector',
                        path: 'embedding',
                        numDimensions: 768,
                        similarity: 'cosine'
                     }
                  ]
               }
            });
            console.log('✔️ Vector index created');
         }else{
            console.log('✔️ Vector index already exist');
         }
      }
      catch(error){
         console.error('❌ Error at vector index creation: ', error);
      }
   };

};
export const setupVectorIndex: SetupVectorIndex = new SetupVectorIndex();