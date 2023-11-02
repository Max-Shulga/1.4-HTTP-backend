import {config} from "./config.js" ;
import fallbackUsers from "./fallbackUsers.js";
import {sendRequest} from "./sendRequest.js";
import {processUserData} from "./processUserData.js";
import {dataTable} from "./dataTable.js";
import {tableManipulations} from "./tableManiplation/tableManipulations.js";


(async () => {
    const {apiUrl: url} = config;

    const userData = processUserData();

    const request = await sendRequest(url, 'GET');

    const users = userData.getUserObj(request) ?? fallbackUsers;

    dataTable(users, config);

    const tableManipulation = tableManipulations(url,userData);

    await tableManipulation.modifyTable()

})();









