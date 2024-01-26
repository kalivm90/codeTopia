import mongoose, {Schema, model, models} from "mongoose";

export interface IPrompt {
    _id: string,
    creator: mongoose.Schema.Types.ObjectId,
    prompt: string,
    tag: string,
}


const PromptSchema = new Schema<IPrompt>({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String, 
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;