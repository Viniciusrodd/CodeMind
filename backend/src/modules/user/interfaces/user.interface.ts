
// imports
import { ObjectId } from "mongoose";

// import DTOs
import { UserDTOs } from "@user/dtos/user.dtos";


// user schema
export interface IUserDocument {
   _id: string | ObjectId,
   name: string,
   createdAt: Date,
   updatedAt: Date
};

// user repository
export interface IUserRepository {
   create(data: UserDTOs): Promise<any>,
   get(): Promise<any>,
   update(data: UserDTOs): Promise<any>,
   delete(): Promise<any>,
   count(): Promise<number>
};