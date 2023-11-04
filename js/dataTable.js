/**
 * Module for creating user tables
 * @module dataTable
 */

export function dataTable() {

    return {
        createUserTable: createTable
    }
    /**
     * Function to create a user table
     * @function createTable
     * @param {Array} users - An array of user data
     * @param {Object} options - Options for creating the table
     * @param {string} options.parent - Selector for the parent element in the DOM
     * @param {Array} options.columns - An array of column configurations
     */
    function createTable(users, {parent, columns}) {
        const parentElement = document.querySelector(parent);

        const table = document.createElement('table');
        table.classList.add('table');

        const thead = document.createElement('thead');
        thead.classList.add('table-header-container');
        thead.appendChild(createTableHeader(columns, users));

        const headTr = document.createElement('tr');
        headTr.classList.add('table-header');

        //adding data to the table header
        headTr.innerHTML = `<th class="table-header-cell table-cell table-column-1">№</th>`;

        table.appendChild(thead);
        table.appendChild(createTableBody(users, columns))

        //adding data to the table body
        parentElement.appendChild(table);
    }
}
/**
 * Function to create the body of the user table
 * @function createTableBody
 * @param {Array} users - An array of user data
 * @param {Array} columns - An array of column configurations
 * @returns {HTMLTableSectionElement} - The table body element
 */
function createTableBody(users, columns) {

    const tbody = document.createElement('tbody');
    tbody.classList.add('table-body');

    users.forEach((user, rowIndex) => {
        const bodyTr = document.createElement('tr');
        bodyTr.classList.add('table-row');
        bodyTr.innerHTML = `<td class="table-body-cell table-cell table-row-${rowIndex + 1} index-cell">${rowIndex+1}</td>`;

        columns.forEach((column) => {
            if (user[column.value]) {
                const td = document.createElement('td');
                td.className= `table-body-cell table-cell table-row-${rowIndex}`;

                const renderFunction = column.render || ((value) => value.toString());
                const content = renderFunction(user[column.value]);

                typeof content === 'string' ? td.textContent = content.toString() : td.appendChild(content);
                bodyTr.appendChild(td);
            }
        });

        const deleteButton = createDeleteButton(user, rowIndex);
        bodyTr.appendChild(deleteButton);

        tbody.appendChild(bodyTr);
    });

    return tbody;
}

/**
 * Function to create a delete button for a user
 * @function createDeleteButton
 * @param {Object} user - User data
 * @param {number} index - Index of the user in the table
 * @returns {HTMLButtonElement} - The delete button element
 */
function createDeleteButton(user, index) {
    const deleteButton = document.createElement('button');
    deleteButton.className = `delete-button table-row-${index}`;
    deleteButton.dataset.userId = user.id;
    deleteButton.textContent = "Видалити";
    return deleteButton;
}

/**
 * Function to create the header of the user table
 * @function createTableHeader
 * @param {Array} columns - An array of column configurations
 * @param {Array} users - An array of user data
 * @returns {HTMLTableRowElement} - The table header element
 */
function createTableHeader(columns, users) {

    const headTr = document.createElement('tr');
    headTr.classList.add('table-header');
    headTr.innerHTML = `<th class="table-header-cell table-cell table-column-1">№</th>`;

    columns.forEach(({value: columnName, title: columnValue}, index) => {

        if (users[0].hasOwnProperty(columnName)) {
            const th = document.createElement('th');
            th.className = `table-header-cell table-cell table-column-${index + 2}`;
            th.textContent = columnValue;
            headTr.appendChild(th);
        }
    });

    headTr.innerHTML += `<th class="table-header-cell table-cell table-column-last">Дії</th>`

    return headTr;
}
