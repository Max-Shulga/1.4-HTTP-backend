import {sendRequest} from "../usersDataAndServer/sendRequest.js";

/**
 * Module for handling the user addition process.
 * @module addUserProcess
 */
export function addUserProcess() {

    return {
        addInputRowOnClick: addInputRowOnClick,
        sendUserData: sendUserData
    }

    /**
     * Sends user data to the specified URL.
     * @param {string} url - The URL for sending user data.
     * @param users - Object containing user data.
     * @returns {boolean} - True if data sent successfully, otherwise false.
     */
    async function sendUserData(url, users) {
        const inputsData = [...document.getElementsByClassName('new-user-input')]

        if (checkInputData()) {
            if (users.fromServer) {
                const formData = {
                    name: inputsData[0].value.trim(),
                    surname: inputsData[1].value.trim(),
                    avatar: inputsData[2].value.trim(),
                    birthday: inputsData[3].value.trim()
                }
                await sendRequest(url, "POST", formData)
                return true
            } else {
                const formData =
                    {
                        id: (() => {
                            const maxId = users.usersDataFromLocal.reduce((max, current) => {
                                return max > current.id ? maxId : current.id;
                            }, 0)
                            return maxId + 1
                        }),
                        name: inputsData[0].value.trim(),
                        surname: inputsData[1].value.trim(),
                        age: +inputsData[2].value.trim()
                    }
                users.usersDataFromLocal.push(formData)
                return true
            }
        } else {
            return false
        }

        /**
         * Checks if all input data is filled.
         * @returns {boolean} - True if all inputs are filled, otherwise false.
         */
        function checkInputData() {
            let allInputsFilled = true;

            inputsData.map(el => {
                el.classList.remove('empty-input')
            })

            inputsData.map(element => {
                if (element.value.trim() === '') {
                    element.classList.add('empty-input')
                    allInputsFilled = false;
                }
            })
            return allInputsFilled;
        }

    }


    /**
     * Adds a new input row to the table on button click.
     */
    function addInputRowOnClick(users) {

        createInputContainers();

        const inputContainers = document.getElementsByClassName('input-cell');
        addInputsElements();

        /**
         * Creates input containers and adds a new table row with inputs to the table.
         */
        function createInputContainers() {
            const numberOfCellsInRow = document.getElementsByClassName('table-row-1').length

            const newTableRow = document.createElement('tr')
            const usersTable = document.getElementsByClassName('table-body')[0];

            newTableRow.classList.add('table-row');
            usersTable.insertBefore(newTableRow, usersTable.firstChild);

            for (let i = 0; i < numberOfCellsInRow; i++) {
                const inputContainer = document.createElement('td')
                inputContainer.className = `table-body-cell table-cell input-cell`
                newTableRow.appendChild(inputContainer)
            }

            newTableRow.appendChild(createButton());

            /**
             * Creates a button element.
             * @returns {HTMLButtonElement} - The created button element.
             */
            function createButton() {
                const addButton = document.createElement('button');
                addButton.id = `add-button`;
                addButton.textContent = "Додати";
                return addButton;
            }
        }

        /**
         * Adds input elements to the input containers.
         */
        function addInputsElements() {
            inputContainers[1].appendChild(addText("Введіть Ім'я:"));
            inputContainers[1].appendChild(createInput('text'));

            inputContainers[2].appendChild(addText("Введіть Прізвище:"));
            inputContainers[2].appendChild(createInput('text'));

            if (users.fromServer) {
                inputContainers[3].appendChild(addText("Введіть посилання на зображення :"));
                inputContainers[3].appendChild(createInput('text'));
                inputContainers[4].appendChild(addText("Введіть дату народження:"));
                inputContainers[4].appendChild(createInput('date'));
            } else {
                inputContainers[3].appendChild(addText("Введіть ваш вік:"));
                inputContainers[3].appendChild(createInput('text'));
            }

            /**
             * Creates an input element.
             * @param {string} type - The type of the input element.
             * @returns {HTMLInputElement} - The created input element.
             */
            function createInput(type) {
                const input = document.createElement('input');
                input.type = type;
                input.classList.add('new-user-input');
                return input;
            }

            /**
             * Adds a text element with the specified text content.
             * @param {string} text - The text content of the text element.
             * @returns {HTMLParagraphElement} - The created text element.
             */
            function addText(text) {
                const pElement = document.createElement('p')
                pElement.innerHTML = text;
                pElement.style.fontSize = "14px";
                return pElement;
            }
        }

        return true;
    }
}