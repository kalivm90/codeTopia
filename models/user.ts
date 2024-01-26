import {Schema, model, models} from "mongoose";

export interface IUser {
    email: string, 
    username: string, 
    image: string,
    id: string
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        match: [/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
    id: {
        type: String,
    }
});


// This checks to see if the model already exists in the models object, if not, create a new model
const User = models.User || model("User", userSchema);
export default User;

/* 
If working with a regular express backend you would use

const User = model("User", userSchema);
export default User; 

*/