
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@typesGlobal/apiResponse.interface";
import { IUserDocument } from "@user/interfaces/user.interface";

// import services
import { userService } from "@user/services/user.service";

// import DTOs
import { UserDTOs } from "@user/dtos/user.dtos";

// import utils
import { getErrorMessage } from "@utils/errorHandler.util";


class UserController {

   // create user
   public async createUser(
      req: Request<{}, {}, UserDTOs>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         await userService.createUser(req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ User successfully created'
         });
      }
      catch(error){
         console.error('❌ Internal server error at User creation: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at User creation',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

};
export const userController: UserController = new UserController();