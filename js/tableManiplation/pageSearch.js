export function pageSearch() {
    const searchTextArea = document.getElementById('findUserInput').value.toLowerCase();

    if (searchTextArea) {
        const elementsToSearch = [...document.querySelectorAll('.table-cell')];
        let isMatch = true;
        elementsToSearch.map(element => {

            element.classList.remove('highlight');

            if (element.textContent.toLowerCase().includes(searchTextArea)) {

                if (isMatch) {
                    element.scrollIntoView({behavior: 'smooth', block: 'center'});
                    isMatch = false;
                }

                element.classList.add('highlight');

                setTimeout(() => {
                    element.classList.remove('highlight');
                }, 10000)

            }
        })
    }
}