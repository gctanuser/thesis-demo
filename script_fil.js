let serverURL = sessionStorage.getItem("url_link");

// question answering functions
async function sendData(inputValue,purpose) {
    let serverURL_final = serverURL + "process";
    console.log("Sent Data to:"+ serverURL_final)

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
        const response = await fetch(serverURL_final, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task:purpose,input: inputValue, choices: choice_str, model: model_choice}),
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
    let purpose = "answering";

    try{
        let x = await sendData(promptdata,purpose);
        responseDiv.innerHTML = x.response;
    } catch(error){
        responseDiv.innerHTML = "Error";
    }
        
}

// question generation functions

async function sendStory(prompt,context,purpose,grade) {
    let serverURL_final = serverURL + "process";
    console.log("Sent Data to:"+ serverURL_final)

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

    try {
        const response = await fetch(serverURL_final, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task:purpose, input: prompt, context_clue: context, model: model_choice, grade_level: grade}),
        });
        return await response.json(); // Return parsed JSON response
    } catch (error) {
        console.error("Error:", error);
        return { response: "Error occurred" };
    }
}

async function createQuestions(){
    const grade_level = document.getElementById("grade_level_select").value;
    const responseDiv = document.getElementById("response");
    const contextData = document.getElementById("prompt").value;
    const promptdata = document.getElementById('inputString').value;

    responseDiv.innerHTML = "Processing request...";
    console.log(grade_level);
    let purpose = "generation";
    try{

        let x = await sendStory(promptdata,contextData,purpose,grade_level);
        responseDiv.innerHTML = x.response;

    } catch(error){
        responseDiv.innerHTML = "Error";
    }
}

// other fluff
function getURL() {
    const urlstr = document.getElementById("inputURL").value;
    
    if(urlstr){
        sessionStorage.setItem("url_link",urlstr);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let url_data = sessionStorage.getItem("url_link");

    if(url_data){
        document.getElementById("url_string").textContent = url_data;
    }
    else{
        document.getElementById("url_string").textContent = "no data";
    }
    
    console.log(url_data);
});


// code for the generation stuff (keyword highlighting and item uploading)

//<!--Code for the uploading of text file-->
 const fileInput = document.getElementById('fileInput');
 const fileContentsDiv = document.getElementById('fileContents');
 const inputPrompt = document.getElementById('inputString');

 fileInput.addEventListener('change', handleFileSelect, false);

 function handleFileSelect(event) {
 const file = event.target.files[0]; // Get the selected file

 if (file) {
     const reader = new FileReader();

     reader.onload = function(event) {
     const contents = event.target.result; // Get the file contents
    
     // processing contents
     let x = processText(contents);

     inputPrompt.value = x.join(" ");

     };

     reader.onerror = function(event){
     fileContentsDiv.textContent = "Error reading file";
     }

     reader.readAsText(file); 
 }
 }

 function processText(text){
     console.log(text);
     let lines = text.split('\n');

     return lines;
 }
 

 // code for the word - sentence chunk
let activeButtons = new Set();

function removeSpecificCharacters(str) {
    return str.replace(/[,.!?]/g, '');
  }

 function generateButtons() {
     const input = document.getElementById("inputString").value;
     const mode = document.querySelector('input[name="mode"]:checked').value;
     let elements;
    let cleaned_input = removeSpecificCharacters(input);

     if (mode === "words") {
         elements = cleaned_input.split(/\s+/).map(s => s.trim()).filter(s => s.length > 0);
     } else {
         elements = cleaned_input.split(/\.|,|;|!|\?/).map(s => s.trim()).filter(s => s.length > 0);
     }

     const container = document.getElementById("word-container");
     container.innerHTML = ""; 
     activeButtons.clear();
     updateActiveWords();
     
     elements.forEach((element, index) => {
         if (element.trim() !== "") {
             const button = document.createElement("button");
             button.innerText = element;
             button.className = "word-button";
             button.id = `word-button-${index}`;
             button.onclick = () => toggleActive(button, element);
             container.appendChild(button);
         }
     });
 }

 function toggleActive(button, element) {
     if (button.classList.contains("active")) {
         button.classList.remove("active");
         activeButtons.delete(element);
     } else {
         button.classList.add("active");
         activeButtons.add(element);
     }
     updateActiveWords();
 }

 function updateActiveWords() {
     //document.getElementById("activeWords").innerText = Array.from(activeButtons).join(", ");
     document.getElementById("prompt").value = Array.from(activeButtons).join(", ");
 }