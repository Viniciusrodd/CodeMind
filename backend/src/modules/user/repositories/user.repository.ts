
// imports
import { DeleteResult, ClientSession } from "mongoose";

// import models
import { userModel } from "@user/schemas/user.schema";

// import DTOs
import { UserDTOs } from "@user/dtos/user.dtos";

// import interfaces
import { IUserDocument, IUserRepository } from "@user/interfaces/user.interface";


class UserRepository implements IUserRepository {

   // create user
   public async create(data: UserDTOs): Promise<IUserDocument> {
      return userModel.create(data);
   };

   // get user
   public async get(): Promise<IUserDocument | null> {
      return userModel.findOne();
   };

   // update user
   public async update(data: UserDTOs): Promise<IUserDocument | null> {
      return userModel.findOneAndUpdate(
         {},
         { $set: {name: data.name} },
         { returnDocument: 'after' }
      )
   };

   // delete user
   public async delete(session: ClientSession): Promise<DeleteResult> {
      return userModel.deleteOne({}, session);
   };

   // user count
   public async count(): Promise<number> {
      return userModel.countDocuments({});
   };

};
export const userRepository: UserRepository = new UserRepository();