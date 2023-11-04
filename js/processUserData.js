/**
 * Module for processing user data
 * @module processUserData
 */

/**
 * Main module function that returns an object with processing functions
 * @function processUserData
 * @returns {Object} - Object with processing functions
 */
export function processUserData() {

    return {
        getUserObjects: addUniqIdToObjects
    }

    /**
     * Function to add a unique identifier to each user object
     * @function addUniqIdToObjects
     * @param {Object} response - The user data received from the API
     * @returns {Array} - An array of user objects with added unique identifiers
     */
    function addUniqIdToObjects(response) {
        return Object.entries(response.data).map(([id, obj]) => {
            return {
                id: Number(id),
                ...obj
            };
        })
    }
}
