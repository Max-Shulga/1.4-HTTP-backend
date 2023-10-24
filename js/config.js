const imageWidth = 16;

const config = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
        {title: 'Аватар', value: 'avatar', render: renderImage},
        {title: 'Дата Народження', value: 'birthday', render: renderDate}
    ],
    apiUrl: "https://mock-api.shpp.me/mshulga/users"
};

function renderImage(value) {
    const  img = document.createElement('img')
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

export default config