import {deleteUser} from "./deleteUser.js";
import {addUser} from "./addUser.js";
import {tableRewriter} from "./tableRewriter.js";
import {pageSearch} from "./pageSearch.js";

/**
 * Module for handling table manipulations, such as adding and deleting users
 * @module tableManipulations
 */

export function tableManipulations() {

    return {
        modifyTable: modifyTable
    }

    /**
     * Function to initialize table modifications, such as adding and deleting users
     * @function modifyTable
     * @param {string} url - The API endpoint URL
     * @param {Object} userData - User data to be manipulated
     * @param config - Configuration object for the user table
     */
    async function modifyTable(url, userData, config) {
        const deleteButtons = [...document.getElementsByClassName('delete-button')];

        deleteButtons.map(button => {
            button.addEventListener('click', async () => {
                try {
                    const userId = button.dataset.userId;
                    await deleteUser(userId, url);
                    await tableRewriter(userData, config);
                } catch (err) {
                    console.error(err);
                }
            })
        })

        const aadUserButton = document.getElementById('addUserButton');

        let inputRowNotCreated = true
        aadUserButton.addEventListener('click', () => {
            if (inputRowNotCreated) {
                const userAdder = addUser();
                inputRowNotCreated = false;
                userAdder.addInputRowOnClick();
                const addButton = document.getElementById('add-button');
                addButton.addEventListener('click', async () => {
                    const sendDataToServer = await userAdder.sendUserData(url);
                    if (sendDataToServer) await tableRewriter(userData, config);
                })
            }
        })

        const searchButton = document.getElementById('findUserInputButton');

        searchButton.addEventListener('click', () => {
                pageSearch();
            })
    }
}