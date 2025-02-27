let serverURL = sessionStorage.getItem("url_link2");

async function sendData(inputValue) {
    let final_serverURL = serverURL + "process"

    gpt_use = document.getElementById('gpt_check').checked;
    enriched_use = document.getElementById('enriched_model_check').checked;

    if(gpt_use){
        console.log('gpt selected');
    }else if(enriched_use){
        console.log('enriched used');
    }

    
    try {
        const response = await fetch(final_serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: inputValue }),
        });
        return await response.json(); // Return parsed JSON response
    } catch (error) {
        console.error("Error:", error);
        return { response: "Error occurred" };
    }
}

async function getResponse() {
    const responseDiv = document.getElementById("response");
    const promptdata = document.getElementById("prompt").value;
    let x = await sendData(promptdata);
    responseDiv.innerHTML = x.response;
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
        sessionStorage.setItem("url_link2",urlstr);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let url_data = sessionStorage.getItem("url_link2");

    if(url_data){
        document.getElementById("url_string").textContent = url_data;
    }
    else{
        document.getElementById("url_string").textContent = "no data";
    }

    console.log(url_data);
    
});