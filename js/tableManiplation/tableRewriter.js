import {sendRequest} from "../sendRequest.js";
import fallbackUsers from "../fallbackUsers.js";
import {dataTable} from "../dataTable.js";

export async function tableRewriter(userData,config) {
    const request = await sendRequest(config.apiUrl, 'GET');
    const users = userData.getUserObjects(request) ?? fallbackUsers;
    const table = document.getElementsByClassName('table')[0];
    table.remove();
    dataTable().createUserTable(users, config);
}