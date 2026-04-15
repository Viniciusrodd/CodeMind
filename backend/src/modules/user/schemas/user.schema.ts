
// imports
import { model, Model, Schema } from "mongoose"; // "model(function)" - "Model(interface, type)"

// import interfaces
import { IUserDocument } from "@user/interfaces/user.interface";


// schema
const userSchema: Schema = new Schema<IUserDocument>({
   name: { type: String },
   createdAt: { type: Date },
   updatedAt: { type: Date }
});


// model
const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User'); // model("model_name", "schema", "collection_name")
export { UserModel };