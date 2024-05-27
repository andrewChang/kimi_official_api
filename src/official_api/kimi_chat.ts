import { OpenAI } from 'openai';
import {
    CreateChatCompletionRequest,
    ChatCompletionResponseMessage,
    CreateChatCompletionResponse
} from './kimi_types.ts';

const client = new OpenAI({
    apiKey: "sk-QWpEYz7JGYCJa2W1WRJUtULP9E0lB6LAd59vyEyYEbUW7FZ7",    
    baseURL: "https://api.moonshot.cn/v1",
});

async function main() {
    const request: CreateChatCompletionRequest = {
        model: "moonshot-v1-8k",
        messages: [
            {
                role: "system", 
                content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"
            },
            {
                role: "user", 
                content: "你是一个数学专家，算一算198*222等于多少？"
            }
        ],
        temperature: 0.3
    };  
    try {
        const completion: CreateChatCompletionResponse = await client.chat.completions.create(request) as CreateChatCompletionResponse;
        const message: ChatCompletionResponseMessage | undefined = completion.choices[0]?.message;
        if (message && message.content !== null) {
            console.log(message.content);
        } else {
            console.error("No message content found in completion response.");
        }
    } catch (error) {
        console.error("Error creating chat completion:", error);
    }
}

main();
