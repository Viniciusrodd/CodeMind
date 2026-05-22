
// imports
import axios from "axios";

// import DTOs
import type { UserDTOs } from "@DTOs/user.dtos";

// import interfaces
import type { IUserDocument } from "@interfaces/user.interface";
import type { iApiResponse } from "@interfaces/apiResponse.interface";

// import routes
import { userRoute } from "@routes/routes";


class UserService {

   // create user
   public async createUser(
      data: UserDTOs
   ): Promise<IUserDocument> {
      try{
         const res = await axios.post<iApiResponse<IUserDocument>>(userRoute, data);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao criar usuário',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // get user
   public async getUser(): Promise<IUserDocument> {
      try{
         const res = await axios.get<iApiResponse<IUserDocument>>(userRoute);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao pegar usuário',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // update user
   public async updateUser(
      data: UserDTOs
   ): Promise<IUserDocument> {
      try{
         const res = await axios.put<iApiResponse<IUserDocument>>(userRoute, data);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao atualizar usuário',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

};
export const userService: UserService = new UserService();