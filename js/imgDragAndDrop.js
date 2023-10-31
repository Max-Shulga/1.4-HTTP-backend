export const dragAndDrop = () => {

    document.addEventListener("change", function (e) {
        const inputFile = e.target;
        if (inputFile && inputFile.id === "input-file") {
            uploadImage()
        }

        function uploadImage() {
            const dropArea = inputFile.parentNode;
            const imgView = dropArea.querySelector("#img-view");

            const imgLink = URL.createObjectURL(inputFile.files[0])

            imgView.style.backgroundImage = `url(${imgLink})`;
            imgView.style.backgroundSize = 'cover';
            imgView.textContent = '';
            imgView.style.width = '60px'
            imgView.style.height = '60px'
            inputFile.style.display = 'none'
        }

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            inputFile.files = e.dataTransfer.files
            uploadImage()
        });
    })
}