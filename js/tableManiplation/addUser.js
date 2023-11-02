import {sendRequest} from "../sendRequest.js";
import {tableRewriter} from "./tableRewriter.js";

export function addUser() {


    return {
        addInputRowOnClick: addInputRowOnClick,
        sendUserData: sendUserData
    }

    async function sendUserData(url, userData) {
        const inputsData = [...document.getElementsByClassName('new-user-input')]


        if (checkInputData()) {
            const id = incrementUniqueID();
            const formData = {
                data: {
                    [id]: {
                        name: inputsData[0].value.trim(),
                        surname: inputsData[1].value.trim(),
                        avatar: inputsData[2].value.trim(),
                        birthday: inputsData[3].value.trim()
                    }
                }
            }
            const jsonData = JSON.stringify(formData);
            console.log(jsonData)

            await sendRequest(url, "POST", jsonData)
            await tableRewriter(userData)

            function getUniqueId() {
                let uniqueId = localStorage.getItem('uniqueID');
                if (!uniqueId) {
                    uniqueId = "50";
                    localStorage.setItem('uniqueId', uniqueId);
                }
                return uniqueId
            }

            function incrementUniqueID() {
                let uniqueId = getUniqueId();
                localStorage.setItem('uniqueID', uniqueId)
                return uniqueId
            }
        }

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

    function addInputRowOnClick() {
        const aadUserButton = document.getElementById('addUserButton')

        aadUserButton.addEventListener('click', () => {

            createInputContainers()
            const inputContainers = document.getElementsByClassName('input-cell')

            addInputsElements()

            function createInputContainers() {
                const numberOfCellsInRow = document.getElementsByClassName('table-row-1').length

                const newTableRow = document.createElement('tr')
                const usersTable = document.getElementsByClassName('table-body')[0];

                newTableRow.className = 'table-row';
                usersTable.insertBefore(newTableRow, usersTable.firstChild);

                for (let i = 0; i < numberOfCellsInRow - 1; i++) {
                    const inputContainer = document.createElement('td')
                    inputContainer.className = `table-body-cell table-cell input-cell`
                    newTableRow.appendChild(inputContainer)
                }

                newTableRow.appendChild(createButton());
            }

            function addInputsElements() {
                inputContainers[1].appendChild(addText("Введіть Ім'я:"));
                inputContainers[1].appendChild(createInput('text'));

                inputContainers[2].appendChild(addText("Введіть Прізвище:"));
                inputContainers[2].appendChild(createInput('text'));

                inputContainers[3].appendChild(addText("Введіть посилання на зображення :"));
                inputContainers[3].appendChild(createInput('text'));
                inputContainers[4].appendChild(addText("Введіть дату народження:"));
                inputContainers[4].appendChild(createInput('date'));
                // inputContainers[4].appendChild(createInput('text'));
            }

            function createInput(type) {
                const input = document.createElement('input');
                input.type = type;
                input.className = 'new-user-input'
                return input;
            }

            function createButton() {
                const addButton = document.createElement('button');
                addButton.className = `add-button`;
                addButton.textContent = "Додати";
                return addButton;
            }

            function addText(text) {
                const pElement = document.createElement('p')
                pElement.innerHTML = text;
                pElement.style.fontSize = "14px";
                return pElement;
            }

        })
    }
}