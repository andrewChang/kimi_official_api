// types.ts

export class CreateChatCompletionRequest {
    model: string;
    messages: ChatCompletionMessage[];
    temperature?: number;
    constructor(model:string,messages:ChatCompletionMessage[],temperature?:number){
        this.model = model;
        this.messages = messages;
        this.temperature = temperature;
    }
}

export class ChatCompletionMessage {
    role: "system" | "user" | "assistant";
    content: string;
    constructor(role:"system" | "user" | "assistant",content:string){
        this.role = role;
        this.content = content;
    }
}

export interface ChatCompletionChoice {
    message: ChatCompletionResponseMessage;
}

export interface ChatCompletionResponseMessage {
    role: "system" | "user" | "assistant";
    content: string | null;
}

export interface CreateChatCompletionResponse {
    choices: ChatCompletionChoice[];
}
