import {sendRequest} from "../sendRequest.js";
import fallbackUsers from "../fallbackUsers.js";
import {dataTable} from "../dataTable.js";
import {config} from "../config.js";

export async function tableRewriter(userData) {
    const request = await sendRequest(config.apiUrl, 'GET');
    const users = userData.getUserObj(request) ?? fallbackUsers;
    const table = document.getElementsByClassName('table')[0];
    table.remove();
    dataTable(users, config);
}