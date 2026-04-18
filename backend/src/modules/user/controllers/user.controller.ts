
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
         const user: IUserDocument = await userService.createUser(req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ User successfully created',
            data: user
         });
      }
      catch(error){
         console.error('❌ Internal server error at user creation: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at user creation',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // get user
   public async getUser(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const user: IUserDocument | null = await userService.getUser();

         return res.status(200).send({
            success: true,
            message: '✔️ Getting user with success',
            data: user
         });
      }
      catch(error){
         console.error('❌ Internal server error at get user: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at get user',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // update user
   public async updateUser(
      req: Request<{}, {}, UserDTOs>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const user: IUserDocument | null = await userService.updateUser(req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ Update user successfully',
            data: user
         });
      }
      catch(error){
         console.error('❌ Internal server error at update user: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at update user',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // delete user
   public async deleteUser(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         await userService.deleteUser();

         return res.status(200).send({
            success: true,
            message: '✔️ Delete user with success'
         });
      }
      catch(error){
         console.error('❌ Internal server error at delete user: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at delete user',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

};
export const userController: UserController = new UserController();