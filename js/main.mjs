import config from "./config.js" ;
import fallbackUsers from "./fallbackUsers.js";
import sendRequest from "./sendRequest.js";

function DataTable(config) {
    return (async () => {
        try {

            const {apiUrl: url, parent, columns} = config;
            const request = await sendRequest(url, 'GET');

            //merging a unique id with the data.
            let users =  Object.entries(request.data).map(([id, obj]) => {
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

            return users;
        } catch (error) {
            console.log(error)
        }
    })();
}


async function initializeTable() {
    try {
        const usersPromise = DataTable(config);
        const users = await usersPromise;
        const deleteButtons = await waitForButtons('delete-button');

        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.id;
                const user = document.getElementById(id)
                console.log(user)

                // sendRequest(`${config.apiUrl}/${id}`, "DELETE")
                // removeLine(id);
            })
        })

    } catch (error) {
        console.error(error);
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

function createTableBody(data, columns) {
    const tbody = document.createElement('tbody');
    tbody.className = 'table-body';

    data.forEach((rowData, rowIndex) => {
        const bodyTr = document.createElement('tr');
        bodyTr.className = 'table-row';
        bodyTr.id = rowIndex
        bodyTr.innerHTML = `<td class="table-body-cell table-cell table-row-${++rowIndex}">${rowIndex}</td>`;

        columns.forEach((column) => {
            if (rowData[column.value]) {
                const td = document.createElement('td');
                td.className = `table-body-cell table-cell table-row-${rowIndex}`;
                const renderFunction = column.render || ((value) => value.toString());
                const content = renderFunction(rowData[column.value]);

                typeof content === 'string' ? td.textContent = content.toString() : td.appendChild(content);
                bodyTr.appendChild(td);
            }
        });
        bodyTr.innerHTML += `<td class="table-body-cell table-cell table-row-${rowIndex}">
<button class="delete-button"" >Видалити</button></td>`;
        tbody.appendChild(bodyTr);
    });

    return tbody;
}

document.addEventListener('DOMContentLoaded', initializeTable);

function waitForButtons(selector) {
    return new Promise((resolve) => {
        const checkButtons = () => {
            const buttons = document.getElementsByClassName(selector);
            if ([...buttons].length > 0) {
                resolve([...buttons]);
            } else {
                setTimeout(checkButtons, 100);
            }
        };

        checkButtons();
    });
}

function removeLine(id) {

}












