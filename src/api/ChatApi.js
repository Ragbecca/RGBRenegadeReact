import { instance } from "./AuthApi";
import { bearerAuth } from "../misc/Helpers";

export function getMessages(user) {
    return instance.get(`/api/chat/get-all`, {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}

export function sendMessage(user, text) {
    let msg = {
        sender: user.data.sub,
        content: text
    }
    return instance.post(`/api/chat/send`, msg, {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}