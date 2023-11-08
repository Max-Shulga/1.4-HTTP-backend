import { sendRequest } from "./sendRequest.js";
import { config } from "./config.js";
import { processUserData } from "./processUserData.js";
import { fallbackUsers } from "./fallbackUsers.js";

let users = null;

/**
 * Function to get user data.
 * @returns {Object} Object containing user data.
 */
export async function getUsersData() {
  const userDataFromServer = await getUserDataFromServer();

  users = {
    fromServer: Boolean(userDataFromServer),
    usersDataFromServer: userDataFromServer,
    usersDataFromLocal: fallbackUsers,
    updateServerData: async () => {
      try {
        users.usersDataFromServer = await getUserDataFromServer();
      } catch (error) {
        console.error("Failed to update user data from the server:", error);
        throw new Error("Failed to update user data. Please try again later.");
      }
    },
  };

  return users;

  /**
   * Gets user data from the server.
   * @returns {Promise<Array>} Array of users object.
   */
  async function getUserDataFromServer() {
    const request = await sendRequest(config.apiUrl, "GET");
    return processUserData().getUserObjects(request);
  }
}
