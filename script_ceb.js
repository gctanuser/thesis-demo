let serverURL = sessionStorage.getItem("url_link2");

async function sendData(inputValue) {
    let final_serverURL = serverURL + "process"

    gpt_use = document.getElementById('gpt_check').checked;
    enriched_use = document.getElementById('enriched_model_check').checked;

    let model_choice = "gpt";

    if(gpt_use){
        model_choice = "gpt";
        console.log('gpt selected');
    }else if(enriched_use){
        console.log('enriched used');
        model_choice = "enriched";
    }

    choice_a = "A.)"+document.getElementById('choice_a').value;
    choice_b = "B.)"+document.getElementById('choice_b').value;
    choice_c = "C.)"+document.getElementById('choice_c').value;
    choice_d = "D.)"+document.getElementById('choice_d').value;
    
    choice_str = choice_a +", "+choice_a+", "+choice_b+", "+choice_c+", "+choice_d;

    console.log("model choice is "+ model_choice)

    try {
        const response = await fetch(final_serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: inputValue, choices: choice_str, model: model_choice }),
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

    responseDiv.innerHTML = "Processing request...";
    
    try{
        let x = await sendData(promptdata);
        responseDiv.innerHTML = x.response;
    } catch(error){
        responseDiv.innerHTML = "Error";
    }
    
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