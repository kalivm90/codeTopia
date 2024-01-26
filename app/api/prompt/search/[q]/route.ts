import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

// GET (read for editing post, used in update_post)
export const GET = async (request: Request, {params} : {
    params: {q: string}
}) => {
    try {
        await connectToDB();

        console.log(params.q);

        const searchField = {$regex: params.q, $options: `i`}

        const prompt = await Prompt.find({
            $or: [
                // Search prompt/body of text
                {prompt: searchField},
                // Search for tag
                {tag: searchField},
                // Search by username
                {'creator.username': searchField},
                // Search by email
                {'creator.email': searchField}

            ]
        }).populate("creator");
        

        if (!prompt) return new Response("Prompt not found", {status: 404});

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts", {status: 500});
    }
}