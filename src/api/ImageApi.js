import { instance } from "./AuthApi";
import { bearerAuth } from "../misc/Helpers";

export function addImage(user, imageJSON) {
    return instance.post(`/api/image/upload`, imageJSON, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': bearerAuth(user),
        }
    })
}

export function getImage(imageId, user) {
    return instance.get(`/api/image/get?id=${imageId}`, {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}

export function getImageUser(username, user) {
    return instance.get(`/api/image/get-user?username=${username}`, {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}