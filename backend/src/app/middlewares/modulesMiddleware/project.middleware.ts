
// imports
import { body, ValidationChain, param } from 'express-validator';


class ProjectValidations {

   // project creation
   public creation(): ValidationChain[] {
      return [
         body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome apenas em caracteres')
            .isLength({ min: 2, max: 120 }).withMessage('Nome deve ser entre 2 e 120 caracteres')
            .trim(),
         
         body('description')
            .optional()
            .isString().withMessage('Descrição apenas em caracteres')
            .trim().escape(),

         body('context')
            .notEmpty().withMessage('Contexto é obrigatório')
            .isObject().withMessage('Contexto deve ser um objeto'),

         body('context.type')
            .notEmpty().withMessage('Tipo é obrigatório')
            .isIn(['backend', 'frontend', 'fullstack'])
            .withMessage('Tipo deve ser alguma das opções: backend, frontend ou fullstack'),
         
         body('context.languages')
            .notEmpty().withMessage('Linguagem é obrigatória')
            .isArray({ min: 1 }).withMessage('Deve ter ao menos uma linguagem'),
         body('context.languages.*')
            .notEmpty().withMessage('Linguagem é obrigatória')
            .isString().withMessage('Linguagem apenas em caracteres'),

         body('context.frameworks')
            .notEmpty().withMessage('Framworks é obrigatório')
            .isArray().withMessage('Frameworks deve ser array'),
         body('context.frameworks.*')
            .notEmpty().withMessage('Framworks é obrigatório')
            .isString().withMessage('Framework apenas em caracteres'),

         body('context.purpose')
            .notEmpty().withMessage('Propósito é obrigatório')
            .isString(),

         body('context.environment')
            .notEmpty().withMessage('Ambiente é obrigatório')
            .isString(),
      ]
   };

   // get project by id
   public getById(): ValidationChain[] {
   return [
      param('id')
         .notEmpty().withMessage('A identificação é obrigatória')
         .isMongoId().withMessage('Identificação inválida')
      ];
   };

   // project update
   public update(): ValidationChain[] {
      return [
         param('id')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('Identificação inválida'),

         body('name')
            .optional()
            .isString().withMessage('Nome apenas em caracteres')
            .isLength({ min: 2, max: 120 }).withMessage('Nome deve ser entre 2 e 120 caracteres')
            .trim(),
         
         body('description')
            .optional()
            .isString().withMessage('Descrição apenas em caracteres')
            .trim().escape(),

         body('context')
            .optional()
            .isObject().withMessage('Contexto deve ser um objeto'),

         body('context.type')
            .optional()
            .isIn(['backend', 'frontend', 'fullstack'])
            .withMessage('Tipo deve ser alguma das opções: backend, frontend ou fullstack'),
         
         body('context.languages')
            .optional()
            .isArray({ min: 1 }).withMessage('Deve ter ao menos uma linguagem'),
         body('context.languages.*')
            .optional()
            .isString().withMessage('Linguagem apenas em caracteres'),

         body('context.frameworks')
            .optional()
            .isArray().withMessage('Frameworks deve ser array'),
         body('context.frameworks.*')
            .optional()
            .isString().withMessage('Framework apenas em caracteres'),

         body('context.purpose')
            .optional()
            .isString().withMessage('Propósito apenas em caracteres'),

         body('context.environment')
            .optional()
            .isString().withMessage('Ambiente apenas em caracteres'),
      ]
   };

   // delete project
   public delete(): ValidationChain[] {
      return [
         param('id')
            .notEmpty().withMessage('A identificação é obrigatória')
            .isMongoId().withMessage('Identificação inválida')
      ];
   };

};
export const projectValidations: ProjectValidations = new ProjectValidations();