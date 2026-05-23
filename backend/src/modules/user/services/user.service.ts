
// import repository
import { userRepository } from "@user/repositories/user.repository";

// import DTOs
import { UserDTOs } from "@user/dtos/user.dtos";

// import interfaces
import { IUserDocument } from "@user/interfaces/user.interface";


class UserService {

   // create user
   public async createUser(data: UserDTOs): Promise<IUserDocument> {
      const existingUser = await userRepository.count();
      if(existingUser > 0) throw new Error('Apenas 1 usuário é permitido na aplicação');

      const user = await userRepository.create(data);
      return user;
   };

   // get user
   public async getUser(): Promise<IUserDocument | null> {
      const user = await userRepository.get();
      if(!user) throw new Error('Usuário não encontrado');

      return user;
   };

   // update user
   public async updateUser(data: UserDTOs): Promise<IUserDocument | null> {
      const user = await userRepository.update(data);
      if(!user) throw new Error('Erro ao atualizar usuário');

      return user!;
   };

};
export const userService: UserService = new UserService();