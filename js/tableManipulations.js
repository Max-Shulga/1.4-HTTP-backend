import sendRequest from "./sendRequest.js";

export function tableManipulations() {

    return {
        deleteUser: deleteUser
    }

    async function deleteUser(event,url) {
        try {
            const userId = event.target.dataset.userId;
            await sendRequest(`${url}/${userId}`, "DELETE")
        } catch (error) {
            console.error(error)
        }
    }
}