import { auth } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function run() {
//     // For text-only input, use the gemini-pro model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = "What is the full form of CSS";

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
// }

// export default run;

export async function POST(req: Request) {
    try {
        // To check if the user is authenticated
        const { userId } = auth();

        // To get the body of the request
        const body = await req.json();

        // To get the message from the body
        const { message } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!genAI) {
            return new NextResponse("Gemini api key is not provided", {
                status: 500,
            });
        }

        if (!message) {
            return new NextResponse("Message is required", { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(
            "You are chatting with a friendly AI. Feel free to engage in conversation, ask questions, or discuss topics of interest. The AI will respond naturally, striving to maintain an engaging and friendly dialogue. Let's start chatting!" +
                " " +
                message
        );
        const response = await result.response;

        // Check the console to see the response
        const text = response.text();

        return new NextResponse(text, { status: 200 });
    } catch (error) {
        console.log("[conversation error]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
