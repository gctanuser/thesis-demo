function getResponse() {
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "This is a fixed response to every request.";
}

function updateFileList() {
    const fileInput = document.getElementById("formFileMultiple");
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = ""; // Clear previous list

    // Iterate over selected files and add to list
    for (let file of fileInput.files) {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = file.name;
        fileList.appendChild(listItem);
    }
}

function getURL() {
    const urlstr = document.getElementById("inputURL").value;
    
    if(urlstr){
        sessionStorage.setItem("url_link",urlstr);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const url_display = document.getElementById("url_link");
    const url_data = sessionStorage.getItem("url_link");

    if(url_data){
        console.log(url_data);
    }
    else{
        console.log("No Data");
    }
    
});