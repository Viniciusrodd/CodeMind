
// import DTOs
import { BuildAnalysisPromptDTO } from "@analysis/dtos/analysis.dtos";


class BuildAnalysisPromptService {

   public execute(data: BuildAnalysisPromptDTO): string {
      return `
         Você é um especialista em análise técnica de código.

         INFORMAÇÕES DO PROJETO:

         Tipo:
         ${data.projectContext.type}

         Linguagens:
         ${data.projectContext.languages.join(', ')}

         Frameworks:
         ${data.projectContext.frameworks.join(', ')}

         Propósito:
         ${data.projectContext.purpose}

         Ambiente:
         ${data.projectContext.environment}


         CONTEXTO RECUPERADO DO PROJETO:

         ${data.ragContext}


         CONTEXTO ADICIONAL DO USUÁRIO:

         ${data.userContext || 'Nenhum contexto informado'}


         CÓDIGO ENVIADO PARA ANÁLISE:

         ${data.code}


         INSTRUÇÕES:

         1. Explique claramente o funcionamento
         2. Identifique possíveis erros
         3. Sugira melhorias
         4. Aponte boas práticas
         5. Estruture a resposta em tópicos
         6. Seja técnico mas didático
         7. Não invente informações inexistentes
         8. Responda de forma objetiva


         FORMATO DA RESPOSTA:

         ## Explicação

         ## Problemas encontrados

         ## Sugestões

         ## Boas práticas

         LIMITE:
         
         ## Explicação: máximo 5 linhas
         ## Problemas encontrados: máximo 5 itens
         ## Sugestões: máximo 5 itens
         ## Sugestões: máximo 5 itens
         ## Não repita informações entre seções.
      `;
   };

};
export const buildAnalysisPromptService: BuildAnalysisPromptService = new BuildAnalysisPromptService();