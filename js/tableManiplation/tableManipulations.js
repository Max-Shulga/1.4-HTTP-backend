import { addUserProcess } from "./addUserProcess.js";
import { tableWriter } from "../tableWriter/tableWriter.js";
import { pageSearch } from "./pageSearch.js";

/**
 * Handles various table manipulations such as adding users and searching.
 * @param {Object} config - Configuration object.
 * @param {Object} users - User data object.
 * @returns {Object} - Object with methods for adding users and searching the table.
 */
export function tableManipulations(config, users) {
  return {
    addUser: addUser,
    tableSearch: tableSearch,
  };

  /**
   * Adds a new user to the table.
   */
  async function addUser() {
    const addUserButton = document.getElementById("addUserButton");

    let inputRowNotCreated = true;

    addUserButton.addEventListener("click", () => {
      if (inputRowNotCreated) {
        const userAdder = addUserProcess();
        inputRowNotCreated = false;

        userAdder.addInputRowOnClick(users);

        const addButton = document.getElementById("add-button");

        addButton.addEventListener("click", async () => {
          const isUserAdded = await userAdder.sendUserData(
            config.apiUrl,
            users,
          );

          if (users.fromServer) await users.updateServerData();

          if (isUserAdded) {
            await tableWriter(config, users);
            inputRowNotCreated = true;
          }
        });
      }
    });
  }

  /**
   * Initiates a search in the table based on user input.
   */
  function tableSearch() {
    const searchButton = document.getElementById("findUserInputButton");

    searchButton.addEventListener("click", () => {
      pageSearch();
    });
  }
}
