export function addUser() {
    const aadUserButton = document.getElementById('addUserButton')


    aadUserButton.addEventListener('click', () => {
        const numberOfCellsInRow = document.getElementsByClassName('table-row-1').length


        const newTableRow = document.createElement('tr')
        const usersTable = document.getElementsByClassName('table-body')[0];

        newTableRow.className = 'table-row';
        usersTable.insertBefore(newTableRow, usersTable.firstChild);

        for (let i = 0; i < numberOfCellsInRow - 1; i++) {
            const inputContainer = document.createElement('td')
            inputContainer.className = `table-body-cell table-cell input-row`
            newTableRow.appendChild(inputContainer)
        }


        const inputContainers = document.getElementsByClassName('input-row')

        inputContainers[1].appendChild(addText("Введіть Ім'я:"));
        inputContainers[1].appendChild(createInput('text'));
        inputContainers[2].appendChild(addText("Введіть Прізвище:"));
        inputContainers[2].appendChild(createInput('text'));
        inputContainers[3].appendChild(addDragAndDrop());
        inputContainers[4].appendChild(addText("Введіть дату народження:"));
        inputContainers[4].appendChild(createInput('date'));
        newTableRow.appendChild(createButton());
    })

    function createInput(type) {
        const textInput = document.createElement('input');
        textInput.type = type;
        return textInput;
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

    function addDragAndDrop() {
        const dropArea = document.createElement("label");
        dropArea.id = 'dropArea';

        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.id = 'input-file'
        const imgView = document.createElement('div');
        imgView.id = 'img-view'

        dropArea.appendChild(inputFile)
        dropArea.appendChild(imgView)

        return dropArea

    }
}
