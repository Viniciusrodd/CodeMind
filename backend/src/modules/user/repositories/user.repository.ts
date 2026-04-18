
// import models
import { UserModel } from "@user/schemas/user.schema";

// import DTOs
import { UserDTOs } from "@user/dtos/user.dtos";

// import interfaces
import { IUserRepository, IUserDocument } from "@user/interfaces/user.interface";


class UserRepository implements IUserRepository {

   // create user
   async create(data: UserDTOs) {
      return UserModel.create(data);
   };

   // get user
   async get() {
      return UserModel.findOne();
   };

   // update user
   async update(data: UserDTOs) {
      return UserModel.updateOne(
         {},
         { $set: {name: data.name} }
      )
   };

   // delete user
   async delete() {
      return UserModel.deleteOne({});
   };

};
export const userRepository: UserRepository = new UserRepository();