
// imports
import { body, ValidationChain } from 'express-validator';


class UserValidations {

   // user creation
   public creation(): ValidationChain[] {
      return [
         body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome apenas em caracteres')
            .isLength({ min: 4, max: 120 }).withMessage('Nome deve ser entre 4 e 120 caracteres')
            .trim(),
      ]
   };

   // user update
   public update(): ValidationChain[] {
      return [
         body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome apenas em caracteres')
            .isLength({ min: 4, max: 120 }).withMessage('Nome deve ser entre 4 e 120 caracteres')
            .trim(),
      ]
   };

};
export const userValidations: UserValidations = new UserValidations();