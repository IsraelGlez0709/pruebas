const fileList = document.querySelector(".file-list");
const fileBrowseButton = document.querySelector(".file-browse-button");
const fileBrowseInput = document.querySelector(".file-browse-input");
const fileUploadBox = document.querySelector(".file-upload-box");
const fileCompletedStatus = document.querySelector(".file-completed-status");
let totalFiles = 0;
let totalUploadedFiles = 0;

const createFileItemHTML = (file, uniqueIdentifier) => {
    const { name, size } = file;
    const extension = name.split(".").pop();

    return `<li class="file-item" id="file-item-${uniqueIdentifier}">
                <div class="file-extension">${extension}</div>
                    <div class="file-content-wrapper">
                        <div class="file-content">
                            <div class="file-details">
                                <h5 class="file-name">${name}</h5>
                            <div class="file-info">
                                <small class="file-size">4 MB / ${size}</small>
                                <small class="file-divider">|</small>
                                <small class="file-status">Subiendo...</small>
                            </div>
                        </div>
                        <button class="cancel-button">
                            <i class="fa-duotone fa-xmark"></i>
                        </button>
                    </div>
                    <div class="file-progress-bar">
                        <div class="file-progress"></div>
                    </div>
                </div>
            </li>`;
};

const handleFileUploading = (file, uniqueIdentifier) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.upload.addEventListener("progress", (e) => {
        const fileProgress = document.querySelector(`#file-item-${uniqueIdentifier} .file-progress`);
        const fileSize = document.querySelector(`#file-item-${uniqueIdentifier} .file-size`);
        const formattedFileSize = file.size >= 1024 * 1024 ? `${(e.loaded / (1024 * 1024)).toFixed(2)} MB / ${(e.total / (1024 * 1024)).toFixed(2)} MB` : `${(e.loaded / 1024).toFixed(2)} KB / ${(e.total / 1024).toFixed(2)} KB`;

        const progress = Math.round((e.loaded / e.total) * 100);
        fileProgress.style.width = `${progress}%`;
        fileSize.innerText = formattedFileSize;
    });

    xhr.open("POST", "config/api.php", true);
    xhr.send(formData);

    return xhr;
};

const handleSelectedFiles = ([...files]) => {
    if (files.length === 0) return;
    totalFiles += files.length;

    files.forEach((file, index) => {
        const uniqueIdentifier = Date.now() + index;
        const fileItemHTML = createFileItemHTML(file, uniqueIdentifier);
        fileList.insertAdjacentHTML("afterbegin", fileItemHTML);
        const currentFileItem  = document.querySelector(`#file-item-${uniqueIdentifier}`);
        const cancelButton = currentFileItem.querySelector(".cancel-button");
        const xhr = handleFileUploading(file, uniqueIdentifier);

        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                totalUploadedFiles++;
                cancelButton.remove();
                currentFileItem.querySelector('.file-status').innerText = "Subido";
                currentFileItem.querySelector('.file-status').style.color = "#00B129"
                fileCompletedStatus.innerText = `${totalUploadedFiles} / ${totalFiles} archivos subidos.`;
            }
        })
        cancelButton.addEventListener("click", () => {
            xhr.abort();
            currentFileItem.querySelector(".file-status").innerText = "Cancelado";
            currentFileItem.querySelector(".file-status").style.color = "#E3413F";
            cancelButton.remove();
        })
        xhr.addEventListener("error", () => {
            alert("Hubo un error al subir el archivo.");
        })
    });
    fileCompletedStatus.innerText = `${totalUploadedFiles} / ${totalFiles} archivos subidos.`;
};

fileUploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    handleSelectedFiles(e.dataTransfer.files);
    fileUploadBox.classList.remove("active");
    fileUploadBox.querySelector(".file-instruction").innerText =
        "Arrastra el archivo aquí ó";
});

fileUploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileUploadBox.classList.add("active");
    fileUploadBox.querySelector(".file-instruction").innerText =
        "Suelta el archivo aquí ó";
});

fileUploadBox.addEventListener("dragleave", (e) => {
    e.preventDefault();
    fileUploadBox.classList.remove("active");
    fileUploadBox.querySelector(".file-instruction").innerText =
        "Arrastra el archivo aquí ó";
});

fileBrowseInput.addEventListener("change", (e) =>
    handleSelectedFiles(e.target.files)
);
fileBrowseButton.addEventListener("click", () => fileBrowseInput.click());
