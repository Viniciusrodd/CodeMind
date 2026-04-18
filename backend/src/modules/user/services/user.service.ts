
// import repository
import { userRepository } from "@user/repositories/user.repository";

// import DTOs
import { UserDTOs } from "@user/dtos/user.dtos";

// import interfaces
import { IUserRepository } from "@user/interfaces/user.interface";


class UserService {

   // create user
   public async createUser(data: UserDTOs): Promise<void> {
      if(!data.name) throw new Error('Nome de usuário é obrigatório');

      const existingUser = await userRepository.count();
      if(existingUser > 0) throw new Error('Apenas 1 usuário é permitido na aplicação');

      await userRepository.create(data);
   };

};
export const userService: UserService = new UserService();