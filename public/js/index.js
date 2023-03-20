const uploadForm = document.getElementById("uploadForm");

const sendFiles = async () => {
    const uploadedFiles = document.getElementById("uploadedFiles").files;

    const formData = new FormData();

    Object.keys(uploadedFiles).forEach(key => {
        formData.append(uploadedFiles.item(key).name, uploadedFiles.item(key));
    });

    const response = await fetch("http://localhost:8080/upload", {
        method: 'POST',
        body: formData
    });

    const json = await response.json();
    console.log(json);

    main(url);
}

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendFiles();
});


const deleteFile = async () => {
    const res = await fetch("http://localhost:8080/delete");
}

/*
var imageDelete = document.getElementById("imageDelete");

imageDelete.addEventListener("click", (e) => {
    e.preventDefault();
    deleteFile();
})
*/