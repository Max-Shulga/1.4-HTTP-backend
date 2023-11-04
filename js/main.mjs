import {config} from "./config.js" ;
import fallbackUsers from "./fallbackUsers.js";
import {sendRequest} from "./sendRequest.js";
import {processUserData} from "./processUserData.js";
import {dataTable} from "./dataTable.js";
import {tableManipulations} from "./tableManiplation/tableManipulations.js";


(async () => {
    const {apiUrl: url} = config;

    const userDataHandler = processUserData();

    const request = await sendRequest(url, 'GET');

    const users = userDataHandler.getUserObjects(request) ?? fallbackUsers;


    dataTable().createUserTable(users, config);

    document.getElementById('userControlsContainer').style.display = 'grid';

    await tableManipulations().modifyTable(url, userDataHandler,config)

})();









