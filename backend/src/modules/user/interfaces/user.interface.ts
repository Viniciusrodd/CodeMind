
// imports
import { ObjectId } from "mongoose";


// user schema
export interface IUserDocument {
   _id: string | ObjectId,
   name: string,
   createdAt: Date,
   updatedAt: Date
};