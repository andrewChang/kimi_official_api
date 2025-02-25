import fs from 'fs-extra';

import Response from '@/lib/response/Response.ts';
import chat from "./chat.ts";
import ping from "./ping.ts";
import token from './token.ts';
import models from './models.ts';
import chat_V2 from "./chat_v2.ts"

export default [
    {
        get: {
            '/': async () => {
                const content = await fs.readFile('public/welcome.html');
                return new Response(content, {
                    type: 'html',
                    headers: {
                        Expires: '-1'
                    }
                });
            }
        }
    },
    chat,
    ping,
    token,
    models,
    chat_V2
];