
// imports
import { body, ValidationChain, param } from 'express-validator';


class AnalysisValidations {

   // analysis creation
   public creation(): ValidationChain[] {
      return [
         body('projectId')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('Projeto inválido'),

         body('input.code')
            .notEmpty().withMessage('Código é obrigatório')
            .isString().withMessage('Código deve ser texto')
            .isLength({ min: 5 }).withMessage('Código muito pequeno'),

         body('input.context')
            .optional()
            .isString().withMessage('Contexto deve ser texto')
            .isLength({ max: 5000 }).withMessage('Contexto muito grande')
            .trim()
      ];
   };

   // get analysis by id
   public getById(): ValidationChain[] {
      return [
         param('id')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('Análise inválida')
      ];
   };

   // get analysis by project id
   public getByProjectId(): ValidationChain[] {
      return [
         param('projectId')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('Projeto inválido')
      ];
   };

   // delete analysis
   public delete(): ValidationChain[] {
      return [
         param('id')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('Análise inválida')
      ];
   };

};
export const analysisValidations: AnalysisValidations = new AnalysisValidations(); 