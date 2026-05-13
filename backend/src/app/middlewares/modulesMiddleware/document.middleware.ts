
// imports
import { body, ValidationChain, param } from 'express-validator';


class DocumentValidations {

   // document creation
   public creation(): ValidationChain[] {
      return [
         // project id
         body('projectId')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('A identificação é obrigatória'),

         // name
         body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome apenas em caracteres')
            .isLength({ min: 2, max: 120 }).withMessage('Nome deve ter entre 2 e 120 caracteres')
            .trim(),

         // type
         body('type')
            .notEmpty().withMessage('Tipo é obrigatório')
            .isIn(['code', 'doc']).withMessage('Tipo deve ser "code" ou "doc"'),

         // content
         body('content')
            .notEmpty().withMessage('Conteúdo é obrigatório')
            .isString().withMessage('Conteúdo deve ser texto')
            .isLength({ min: 10 }).withMessage('Conteúdo muito pequeno')
      ];
   };

   // document update
   public update(): ValidationChain[] {
      return [
         param('id')
            .isMongoId().withMessage('A identificação é obrigatória'),

         body('name')
            .optional()
            .isString().withMessage('Nome apenas em caracteres')
            .isLength({ min: 2, max: 120 }).withMessage('Nome deve ter entre 2 e 120 caracteres')
            .trim(),

         body('type')
            .optional()
            .isIn(['code', 'doc']).withMessage('Tipo deve ser code ou doc'),

         body('content')
            .optional()
            .isString().withMessage('Conteúdo deve ser texto')
            .isLength({ min: 10 }).withMessage('Conteúdo muito pequeno')
      ];
   };

   // delete document
   public delete(): ValidationChain[] {
      return [
         param('id')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('A identificação é obrigatória')
      ];
   };

   // get document by id
   public getDocumentById(): ValidationChain[] {
      return [
         param('id')
            .notEmpty().withMessage('Documento é obrigatório')
            .isMongoId().withMessage('Documento inválido')
      ];
   };

};
export const documentValidations: DocumentValidations = new DocumentValidations();