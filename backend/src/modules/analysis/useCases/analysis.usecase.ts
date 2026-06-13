
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
import { IAnalysis, IOutput } from "@analysis/interfaces/analysis.interface";

// import DTOs
import { CreateAnalysisDTO } from "@analysis/dtos/analysis.dtos";


class AnalysisUseCase {

   // create
   public async create(data: CreateAnalysisDTO): Promise<IAnalysis> {
      // project validation
      const project = await projectRepository.getById(data.projectId);
      if(!project) throw new Error('Projeto não encontrado'); 

      // vector search generation
      const chunks = await retrieveContextService.execute(
         data.projectId,
         `${data.input.code} ${data.input.context || ''}`
      );

      // clean RAG context
      const ragContext = cleanContextService.execute(chunks);

      // build final prompt
      const prompt = buildAnalysisPromptService.execute({
         projectContext: project.context,
         code: data.input.code,
         userContext: data.input.context,
         ragContext
      });

      // AI provider
      const response = await ollamaProvider.generate(prompt);

      // clean prompt
      const cleaned = response
         .replace(/```json/g, '')
         .replace(/```/g, '')
         .trim();

      // responseCleaned json parse + validation
      const output: IOutput = JSON.parse(cleaned);
      if(!output.explication || !output.problemsFound || !output.suggestions || !output.goodPractices){
         throw new Error('Resposta da IA inválida');
      }

      // analysis persist
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
            explication: output.explication,
            problemsFound: output.problemsFound,
            suggestions: output.suggestions,
            goodPractices: output.goodPractices
         }
      });

      return analysis;
   };

};
export const analysisUseCase: AnalysisUseCase = new AnalysisUseCase();