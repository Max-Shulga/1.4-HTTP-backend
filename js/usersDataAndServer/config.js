const imageWidth = 60;
/**
 * Configuration object for the user table
 * @constant {Object} config
 * @property {string} config.parent - Selector for the parent element in the DOM
 * @property {Array} config.columns - An array of column configurations
 * @property {string} config.apiUrl - API URL for fetching user data
 */
export const config = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
        {title: 'Аватар', value: 'avatar', render: renderImage},
        {title: 'Дата Народження', value: 'birthday', render: renderDate}
    ],
    apiUrl: "https://m1ock-api.shpp.me/mashulga/users"
};

/**
 * Function to render an image element
 * @function renderImage
 * @param {string} value - URL of the image
 * @returns {HTMLImageElement} - The image element
 */
function renderImage(value) {
    const img = document.createElement('img')
    img.src = value;
    img.width = imageWidth;
    return img;
}

/**
 * Function to render a formatted date
 * @function renderDate
 * @param {string} value - Date in ISO format
 * @returns {string} - Formatted date string (DD.MM.YYYY)
 */
function renderDate(value) {
    const date = new Date(value);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth()
    return `${day}.${month}.${date.getFullYear()}`
}

