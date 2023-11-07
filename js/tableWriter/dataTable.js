import {deleteButtons} from "./deleteButtons.js";

/**
 * Factory function for creating a data table.
 * @returns {Object} An object with a method to create a user table.
 */
export function dataTable() {

    return {
        /**
         * Creates a user table and appends it to the specified parent element.
         * @param {Object} usersData - User data object.
         * @param {Object} config - Configuration object for creating the table.
         * @param {string} config.parent - Selector for the parent element in the DOM.
         * @param {Array} config.columns - An array of column configurations.
         */
        createUserTable: createTable
    }

    /**
     * Creates the user table and appends it to the specified parent element.
     * @param {Object} usersData - User data object.
     * @param {Object} config - Configuration object for creating the table.
     * @param {string} config.parent - Selector for the parent element in the DOM.
     * @param {Array} config.columns - An array of column configurations.
     */
    function createTable(usersData, config) {
        const {parent, columns} = config
        const users = usersData.fromServer ? usersData.usersDataFromServer : usersData.usersDataFromLocal;
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

        /**
         * Creates the table body with user data.
         * @param {Array} users - An array of user data.
         * @param {Array} columns - An array of column configurations.
         * @returns {HTMLTableSectionElement} The table body element.
         */
        function createTableBody(users, columns) {
            const tbody = document.createElement('tbody');
            tbody.classList.add('table-body');

            users.forEach((user, rowIndex) => {
                const bodyTr = createTableRow(user, rowIndex, columns, usersData, config);
                tbody.appendChild(bodyTr);
            });

            return tbody;
        }

        /**
         * Creates a table row for a user.
         * @param {Object} user - User data object.
         * @param {number} rowIndex - Index of the row.
         * @param {Array} columns - An array of column configurations.
         * @param {Object} usersData - User data object.
         * @param {Object} config - Configuration object for creating the table.
         * @returns {HTMLTableRowElement} The table row element.
         */
        function createTableRow(user, rowIndex, columns, usersData, config) {
            const bodyTr = document.createElement('tr');
            bodyTr.classList.add('table-row');
            bodyTr.innerHTML = `<td class="table-body-cell table-cell table-row-${rowIndex + 1} index-cell">${rowIndex + 1}</td>`;

            columns.forEach(column => {
                if (user.hasOwnProperty(column.value)) {
                    const td = createTableCell(user, column, rowIndex);
                    bodyTr.appendChild(td);
                }
            });

            const deleteButton = deleteButtons().getDeleteButton(user.id, usersData, config);
            bodyTr.appendChild(deleteButton);

            return bodyTr;
        }

        /**
         * Creates a table cell for a user and column.
         * @param {Object} user - User data object.
         * @param {Object} column - Column configuration object.
         * @param {number} rowIndex - Index of the row.
         * @returns {HTMLTableCellElement} The table cell element.
         */
        function createTableCell(user, column, rowIndex) {
            const td = document.createElement('td');
            td.className = `table-body-cell table-cell table-row-${rowIndex}`;

            const renderFunction = column.render || (value => value.toString());
            const content = renderFunction(user[column.value]);

            typeof content === 'string' ? (td.textContent = content.toString()) : td.appendChild(content);

            return td;
        }

        /**
         * Creates the table header based on the column configurations.
         * @param {Array} columns - An array of column configurations.
         * @param {Array} users - An array of user data.
         * @returns {HTMLTableRowElement} The table header element.
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
    }
}