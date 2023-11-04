import {sendRequest} from "../sendRequest.js";

export async function deleteUser(userId, url) {

    return deleteUserFromServer()
    async function deleteUserFromServer() {
        try {
           await sendRequest(`${url}/${userId}`, "DELETE")
        } catch (error) {
            console.error(error)
        }
    }
}