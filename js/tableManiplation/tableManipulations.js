import {deleteUser} from "./deleteUser.js";
import {addUser} from "./addUser.js";

export function tableManipulations(url, userData) {

    const userAdder = addUser();
    userAdder.addInputRowOnClick();

    return {
        modifyTable: modifyTable
    }

    async function modifyTable() {
        document.addEventListener('click', async (event) => {
            const deleteButton = event.target.closest('.delete-button');
            const addButton = event.target.closest('.add-button')
            if (deleteButton) {
                try {
                    await deleteUser(event, url,userData);
                } catch (err) {
                    console.error(err);
                }
            }

            if (addButton) {
                try {
                    await userAdder.sendUserData(url,userData);

                } catch (err) {
                    console.error(err);
                }
            }
        })
    }
}