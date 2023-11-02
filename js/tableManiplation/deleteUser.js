import {sendRequest} from "../sendRequest.js";
import {tableRewriter} from "./tableRewriter.js";

export async function deleteUser(event, url,userData) {

    return deleteUserFromServer()

    async function deleteUserFromServer() {
        try {
            const userId = event.target.dataset.userId;
            await sendRequest(`${url}/${userId}`, "DELETE")
            await tableRewriter(userData)
        } catch (error) {
            console.error(error)
        }
    }
}