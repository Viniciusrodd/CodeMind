
// imports
import { model, Model, Schema } from "mongoose"; // "model(function)" - "Model(interface, type)"

// import interfaces
import { IUserDocument } from "@user/interfaces/user.interface";


// schema
const userSchema: Schema = new Schema<IUserDocument>({
   name: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});


// model
const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User'); // model("model_name", "schema", "collection_name")
export { UserModel };