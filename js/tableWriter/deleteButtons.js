import { deleteUserProcess } from "./deleteUserProcess.js";
import { tableWriter } from "./tableWriter.js";

/**
 * Factory function for creating delete buttons.
 * @returns {Object} An object with a method to get or create delete buttons.
 */
export function deleteButtons() {
  /** @type {Map<number, HTMLButtonElement>} */
  const buttonsMap = new Map();

  /**
   * Function to create a new delete button.
   * @param {number} userId - The ID of the user associated with the button.
   * @returns {HTMLButtonElement} - A new delete button element.
   */
  function getNewDeleteButton(userId) {
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.userId = String(userId);
    deleteButton.textContent = "Видалити";
    return deleteButton;
  }

  /**
   * Public interface.
   */
  return {
    /**
     * Function to get or create a delete button for a user.
     * @param {number} userId - The ID of the user.
     * @param {Object} users - Object containing user data.
     * @param {Object} config - Configuration object.
     * @returns {HTMLButtonElement} - The delete button associated with the user.
     */
    getDeleteButton: function (userId, users, config) {
      if (!buttonsMap.has(userId)) {
        buttonsMap.set(userId, getNewDeleteButton(userId));
      }

      let deleteButton = buttonsMap.get(userId);

      handleDeleteButtonClick(userId, users, config, deleteButton);

      return deleteButton;
    },
  };

  /**
   * Function to handle the click event on a delete button.
   * @param {number} userId - The ID of the user.
   * @param {Object} users - Object containing user data.
   * @param {Object} config - Configuration object.
   * @param {HTMLButtonElement} deleteButton - The delete button associated with the user.
   */
  function handleDeleteButtonClick(userId, users, config, deleteButton) {
    deleteButton.addEventListener("click", async () => {
      await deleteUserProcess(userId, users, config);
      await users.updateServerData();
      await tableWriter(config, users);

      removeDeleteButton(deleteButton);
    });
  }

  /**
   * Function to remove a delete button from the map and the DOM.
   * @param {HTMLButtonElement} button - The delete button to be removed.
   */
  function removeDeleteButton(button) {
    const userId = button.dataset.userId;
    buttonsMap.delete(+userId);
    button.remove();
  }
}
