import { OpenAI } from 'openai';
import {
    CreateChatCompletionRequest,
    ChatCompletionResponseMessage,
    CreateChatCompletionResponse,
    ChatCompletionMessage
} from '@/official_api/kimi_types.ts';
import Request from '@/lib/request/Request.ts';
import logger from '@/lib/logger.ts';

const client = new OpenAI({
    apiKey: "sk-QWpEYz7JGYCJa2W1WRJUtULP9E0lB6LAd59vyEyYEbUW7FZ7",    
    baseURL: "https://api.moonshot.cn/v1",
});

export default {
    prefix: '/v2/chat',

    post: {
        '/completions' : async (request:Request) => {
            const completion = null;
            try {
                const request_body = request.body;
                const messages : ChatCompletionMessage[] = request_body.messages.map((message:ChatCompletionMessage)=>{
                    return new ChatCompletionMessage(message.role,message.content);
                });
                const creat_request = new CreateChatCompletionRequest(request_body.model,messages,request_body.temperature);
                logger.debug(">>>request="+JSON.stringify(creat_request));
                const completion: CreateChatCompletionResponse = await client.chat.completions.create(creat_request) as CreateChatCompletionResponse;
                logger.debug(">>>response="+JSON.stringify(completion));
                const message: ChatCompletionResponseMessage | undefined = completion.choices[0]?.message;
                if (message && message.content !== null) {
                    console.log(message.content);
                } else {
                    console.error("No message content found in completion response.");
                }
                return completion;
            } catch (error) {
                console.error("Error creating chat completion:", error);
            }
            return completion;
        }
    }

}