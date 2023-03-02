import { instance } from "./AuthApi";
import { bearerAuth } from "../misc/Helpers";

export function getMessages(user, groupId) {
    return instance.get(`/api/chat/messages/${groupId}`, {
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