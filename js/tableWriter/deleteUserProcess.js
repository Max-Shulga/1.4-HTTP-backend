import {sendRequest} from "../usersDataAndServer/sendRequest.js";
import {config} from "../usersDataAndServer/config.js";

export function deleteUserProcess(userIdToDelete, users, {apiUrl: url} = config) {

    return deleteUser()

    async function deleteUser() {
        if (!users.fromServer) {
            //delete user from local object

            users.usersDataFromLocal = users.usersDataFromLocal
                .filter(user => user.id !== +userIdToDelete)

        } else {
            //delete user from server
            try {
                await sendRequest(`${url}/${userIdToDelete}`, "DELETE")
            } catch (error) {
                console.error(error)
            }
        }
    }
}