
// import repositories
import { projectRepository } from "@project/repositories/project.repository";
import { analysisRepository } from "@analysis/repositories/analysis.repository";

// import providers
import { ollamaProvider } from "@ai/providers/ollama.provider";

// import services
import { retrieveContextService } from "@rag/services/retrieveContext.service";
import { cleanContextService } from "@rag/services/cleanContext.service";
import { buildAnalysisPromptService } from "@analysis/services/buildAnalysisPrompt.service";

// import interfaces
import { IAnalysis } from "@analysis/interfaces/analysis.interface";

// import DTOs
import { CreateAnalysisDTO } from "@analysis/dtos/analysis.dtos";


class AnalysisUseCase {

   // create
   public async create(data: CreateAnalysisDTO): Promise<IAnalysis> {
      // 1. project validation
      const project = await projectRepository.getById(data.projectId);
      if(!project) throw new Error('Projeto não encontrado'); 

      // 2. vector search generation
      const chunks = await retrieveContextService.execute(
         data.projectId,
         `${data.input.code} ${data.input.context || ''}`
      );

      // 3. clean RAG context
      const ragContext = cleanContextService.execute(chunks);

      // 4. build final prompt
      const prompt = buildAnalysisPromptService.execute({
         projectContext: project.context,
         code: data.input.code,
         userContext: data.input.context,
         ragContext
      });

      // 5. AI provider
      const respose = await ollamaProvider.generate(prompt);

      // 6. analysis persist
      const analysis = await analysisRepository.create({
         projectId: data.projectId,
         input: {
            code: data.input.code,
            context: data.input.context
         },
         ragContext: chunks.map(chunk => ({
            chunkId: chunk._id,
            score: chunk.score
         })),
         output: {
            structuredAnalysis: respose
         }
      });

      return analysis;
   };

};
export const analysisUseCase: AnalysisUseCase = new AnalysisUseCase();