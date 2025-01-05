let select = document.querySelector(".select-heading");
let arrow = document.querySelector(".select-heading img");
let options = document.querySelector(".options");
let option = document.querySelectorAll(".option");

let chatimg = document.querySelector("#chatbotimg");

// Update the text in the select dropdown
let selectText = document.querySelector(".select-heading span");

select.addEventListener("click", () => {
    options.classList.toggle("active-options");
    arrow.classList.toggle("rotate");
});

option.forEach((item) => {
    item.addEventListener("click", () => {
        selectText.innerText = item.innerText;
    });
});

// Chatbot functionality
let prompt = document.querySelector(".prompt");
let chatbtn = document.querySelector(".input-area button");
let h1 = document.querySelector(".h1");
let chatContainer = document.querySelector(".chat-container");
let chatbox = document.querySelector(".chat-box");
let userMessage = "";

chatimg.addEventListener("click", ()=>{
chatBox.classList.toggle("active-chat-box")
if(chatBox.classList.contains("active-chat-box")){
    chatimg.src = "cross.svg";
    
}else{
    chatimg.src = "chatbot.svg";
}
})

function createChatBox(html, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

function showLoading() {
    const html = `<p class="text loading">Thinking...</p>
    <img src= "load.gif" class="loading" width="50px">`;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    generateApiResponse(aiChatBox);
}

// Fetch AI response
let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAGYTazClEH4g28rApWLppEzvW9xJcakyI";

async function generateApiResponse(aiChatBox) {
    const textElement = aiChatBox.querySelector(".text");

    console.log(userMessage);
    try {
        const response = await fetch(Api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    "role": "user",
                    "parts":[{text:`${userMessage} in 20 words`}]
                }]
            })
        })
        const data = await response.json();
        console.log(data);
        const apiResponse = data?.candidates[0].content.parts[0].text.trim();
        console.log(apiResponse);
        textElement.innerText = apiResponse
    } catch (error) {
        console.log(error);
        textElement.innerText = "An error occurred. Please try again.";
    } finally {
        aiChatBox.querySelector("img.loading").style.display = "none";
    }
}

chatbtn.addEventListener("click", () => {
    h1.style.display="none"
    userMessage = prompt.value.trim();
    if (userMessage) {
        const html = `<p class="text"></p>`;
        let userChatBox = createChatBox(html, "user-chat-box");
        userChatBox.querySelector(".text").innerText = userMessage;
        chatContainer.appendChild(userChatBox);
        prompt.value = "";
        setTimeout(showLoading, 500);
    }
});



//virtual assistant
let ai = document.querySelector(".virtual-assistant img")
let speakpage = document.querySelector(".speak-page")
let content = document.querySelector(".speak-page h1")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    speakpage.style.display = "none"
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}
// btn.addEventListener("click", () => {
//     recognition.start()
//     btn.style.display = "none"
//     voice.style.display = "block"
// })
function takeCommand(message){
    if (message.includes("open chat")) {
        speak("Opening chat bot");
        chatbox.classList.add("active-chat-box");
    } else if (message.includes("close chat")) {
        speak("Closing chat bot");
        chatbox.classList.remove("active-chat-box");
    }else if(message.includes("open back") || message.includes("open back workout")){
        speak("opening back workout")
        window.open("http://127.0.0.1:5500/back.html")
    }
    else if(message.includes("open shoulder") || message.includes("open shoulder workout")){
        speak("opening shoulder workout")
        window.open("http://127.0.0.1:5500/shoulder.html")
    }
    else if(message.includes("open biceps") || message.includes("open bicep workout")){
        speak("opening biceps triceps workout")
        window.open("http://127.0.0.1:5500/bicep_tricep.html")
    }
    else if(message.includes("open legs") || message.includes("open legs workout")){
        speak("opening legs workout")
        window.open("http://127.0.0.1:5500/leg.html")
    }
    else if(message.includes("open chest") || message.includes("open chest workout")){
        speak("opening chest workout")
        window.open("http://127.0.0.1:5500/chest.html")
    }
    
}
ai.addEventListener("click", () =>{
    recognition.start()
    speakpage.style.display="flex";
})