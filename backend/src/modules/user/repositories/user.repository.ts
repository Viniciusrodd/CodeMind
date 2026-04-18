
// import models
import { UserModel } from "@user/schemas/user.schema";

// import DTOs
import { UserDTOs } from "@user/dtos/user.dtos";

// import interfaces
import { IUserRepository } from "@user/interfaces/user.interface";


class UserRepository implements IUserRepository {

   // create user
   public async create(data: UserDTOs) {
      return UserModel.create(data);
   };

   // get user
   public async get() {
      return UserModel.findOne();
   };

   // update user
   public async update(data: UserDTOs) {
      return UserModel.findOneAndUpdate(
         {},
         { $set: {name: data.name} },
         { returnDocument: 'after' }
      )
   };

   // delete user
   public async delete() {
      return UserModel.deleteOne({});
   };

   // user count
   public async count() {
      return UserModel.countDocuments({});
   };

};
export const userRepository: UserRepository = new UserRepository();