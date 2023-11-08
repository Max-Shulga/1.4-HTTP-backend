import {dataTable} from "./dataTable.js";

/**
 * Writes or updates the table based on the provided configuration and user data.
 * @param {Object} config - Configuration object for creating the table.
 * @param {Object} users - User data object.
 */
export async function tableWriter(config, users) {

    const existingTable = document.getElementsByClassName("table")[0];
    if (existingTable) existingTable.remove();

    dataTable().createUserTable(users, config);
}