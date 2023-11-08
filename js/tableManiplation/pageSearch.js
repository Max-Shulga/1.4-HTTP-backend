/**
 * Searches and highlights elements in the table based on the text entered the search input.
 */
export function pageSearch() {
  const searchTextArea = document
    .getElementById("findUserInput")
    .value.toLowerCase();

  if (searchTextArea) {
    const elementsToSearch = [...document.querySelectorAll(".table-cell")];
    let isMatchFound = false;

    elementsToSearch.map((element) => {
      element.classList.remove("highlight");

      if (element.textContent.toLowerCase().includes(searchTextArea)) {
        if (!isMatchFound) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          isMatchFound = true;
        }

        element.classList.add("highlight");

        setTimeout(() => {
          element.classList.remove("highlight");
        }, 10000);
      }
    });
  }
}
