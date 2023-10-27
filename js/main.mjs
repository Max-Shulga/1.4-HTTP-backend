import {config} from "./config.js" ;
import fallbackUsers from "./fallbackUsers.js";
import sendRequest from "./sendRequest.js";
import {processUserData} from "./processUserData.js";
import {dataTable} from "./dataTable.js";
import {tableManipulations} from "./tableManipulations.js";


(async () => {
    const {apiUrl: url} = config;

    const userData = processUserData();

    const request = await sendRequest(url, 'GET');
    const users = userData.getUserObj(request) ?? fallbackUsers;

    dataTable(users, config);

    const tableManipulation = tableManipulations();

    document.addEventListener('click', async (event) => {
        const deleteButton = event.target.closest('.delete-button');
        if (deleteButton) {
            try {

                await tableManipulation.deleteUser(event, url);

                const table = document.getElementsByClassName('table')[0];

                const requestAfterDelete = await sendRequest(url, 'GET');

                table.remove();

                const usersAfterDelete = userData.getUserObj(requestAfterDelete) ?? fallbackUsers;

                dataTable(usersAfterDelete, config);
            } catch (err) {
                console.error(err);
            }
        }
    });
})();









