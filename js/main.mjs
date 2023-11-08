import { config } from "./usersDataAndServer/config.js";
import { tableWriter } from "./tableWriter/tableWriter.js";
import { getUsersData } from "./usersDataAndServer/getUsersData.js";
import { tableManipulations } from "./tableManiplation/tableManipulations.js";

(async () => {
  try {
    const users = await getUsersData();
    await tableWriter(config, users);

    document.getElementById("userControlsContainer").style.display = "grid";

    const tableManipulation = tableManipulations(config, users);

    await tableManipulation.addUser();
    tableManipulation.tableSearch();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
