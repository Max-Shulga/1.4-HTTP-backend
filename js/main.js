const imageWidth = 16;
const config = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Аватар', value: 'avatar', render: renderImage},
        {title: 'Дата Народження', value: 'birthday', render: renderDate}
    ],
    apiUrl: "https://mock-api.shpp.me/mshulga/users"
};

async function sendRequest(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data)
        }
        return data

    } catch (error) {
        throw error;
    }
}


DataTable(config);

function DataTable(config) {
    (async () => {
        try {
            const request = await sendRequest(config.apiUrl);
            const data = Object.values(request.data);
            console.log(data)
            const parentElement = document.querySelector(config.parent);

            const table = document.createElement('table');
            table.className = 'table';

            const thead = document.createElement('thead');
            thead.className = 'table-header-container';
            thead.appendChild(createTableHeader(config.columns));

            const headTr = document.createElement('tr');
            headTr.className = 'table-header';

            //adding data to the table header
            headTr.innerHTML = `<th class="table-header-cell table-cell table-column-1">№</th>`;

            table.appendChild(thead);
            table.appendChild(createTableBody(data, config.columns))


            //adding data to the table body
            parentElement.appendChild(table);
        } catch (error) {
            console.log(error)
        }
    })();
}

function renderImage(value) {
    const img = document.createElement('img')
    img.src = value;
    img.width = imageWidth;
    return img;
}

function renderDate(value) {
    const date = new Date(value);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth()
    return `${day}.${month}.${date.getFullYear()}`
}

function createTableHeader(columns) {
    const headTr = document.createElement('tr');
    headTr.className = 'table-header';
    headTr.innerHTML = `<th class="table-header-cell table-cell table-column-1">№</th>`;

    columns.forEach((column, index) => {
        const th = document.createElement('th');
        th.className = `table-header-cell table-cell table-column-${index + 2}`;
        th.textContent = column.title;
        headTr.appendChild(th);
    });

    return headTr;
}

function createTableBody(data, columns) {
    const tbody = document.createElement('tbody');
    tbody.className = 'table-body';

    data.forEach((rowData, index) => {
        const bodyTr = document.createElement('tr');
        bodyTr.className = 'table-row';
        bodyTr.innerHTML = `<td class="table-body-cell table-cell table-column-1">${++index}</td>`;

        columns.forEach((column, index) => {

            const td = document.createElement('td');
            td.className = `table-body-cell table-cell table-column-${index + 2}`;

            const renderFunction = column.render || ((value) => value);
            const content = renderFunction(rowData[column.value]);

            typeof content === 'string' ? td.textContent = content : td.appendChild(content);
            bodyTr.appendChild(td);

        });

        tbody.appendChild(bodyTr);
    });

    return tbody;
}


