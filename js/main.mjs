import {config} from "./config.js" ;
import fallbackUsers from "./fallbackUsers.js";
import sendRequest from "./sendRequest.js";

async function DataTable(config) {
    try {
        const {apiUrl: url, parent, columns} = config;
        const request = await sendRequest(url, 'GET');

        //merging a unique id with the data.
        let users = Object.entries(request.data).map(([id, obj]) => {
            return {
                id: Number(id),
                ...obj
            };
        });

        users ??= fallbackUsers
        const parentElement = document.querySelector(parent);

        const table = document.createElement('table');
        table.className = 'table';

        const thead = document.createElement('thead');
        thead.className = 'table-header-container';
        thead.appendChild(createTableHeader(columns, users));

        const headTr = document.createElement('tr');
        headTr.className = 'table-header';

        //adding data to the table header
        headTr.innerHTML = `<th class="table-header-cell table-cell table-column-1">№</th>`;

        table.appendChild(thead);
        table.appendChild(createTableBody(users, columns))

        //adding data to the table body
        parentElement.appendChild(table);

    } catch (error) {
        console.log(error)
    }
}


function createTableHeader(columns, users) {

    const headTr = document.createElement('tr');
    headTr.className = 'table-header';
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

function createTableBody(users, columns) {

    const tbody = document.createElement('tbody');
    tbody.className = 'table-body';

    users.forEach((user, rowIndex) => {
        const bodyTr = document.createElement('tr');
        bodyTr.className = 'table-row';
        bodyTr.id = user.id
        bodyTr.innerHTML = `<td class="table-body-cell table-cell table-row-${++rowIndex} index-cell">${rowIndex}</td>`;

        columns.forEach((column, columnIndex) => {
            if (user[column.value]) {
                const td = document.createElement('td');
                td.className = `table-body-cell table-cell table-row-${rowIndex}`;
                const renderFunction = column.render || ((value) => value.toString());
                const content = renderFunction(user[column.value]);

                typeof content === 'string' ? td.textContent = content.toString() : td.appendChild(content);
                bodyTr.appendChild(td);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        deleteButton.dataset.userId = user.id;
        deleteButton.textContent = "Видалити";
        deleteButton.onclick = deleteUser;
        bodyTr.appendChild(deleteButton);

        tbody.appendChild(bodyTr);
    });

    return tbody;
}

DataTable(config)


function deleteUser(event) {
    (async () => {
        try {
            const userId = event.currentTarget.dataset.userId;
            await sendRequest(`${config.apiUrl}/${userId}`, "DELETE")

            const table = document.getElementsByClassName('table')[0];

            await DataTable(config).then(() => {
                table.remove();
            });
        } catch (error) {
            console.error(error)
        }
    })()
}






