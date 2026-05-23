
// imports
import { DeleteResult, ObjectId, ClientSession } from "mongoose";

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
   create(data: UserDTOs): Promise<IUserDocument>,
   get(): Promise<IUserDocument | null>,
   update(data: UserDTOs): Promise<IUserDocument | null>,
   delete(session: ClientSession): Promise<DeleteResult>,
   count(): Promise<number>
};