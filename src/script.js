
let placeholderBtn = document.querySelector(".trans-btn")
let formBtn = document.querySelector(".submit-btn")
if (getCookie("name") != undefined) {
    if (getCookie("password") != undefined) {
        document.querySelector("article").classList.remove("hide")
        document.querySelector(".form").classList.add("hide")
    }
    else (
        document.querySelector(".name-input").classList.add("hide")
    )
    
}

formBtn.onclick = function() {
    document.querySelector("article").classList.remove("hide")
    document.querySelector(".form").classList.add("hide")
    createCookie("name", document.querySelector(".name-input").value, "100000")
    createCookie("password", document.querySelector(".password-input").value, "36000")
}
placeholderBtn.onclick = function() {
    console.log("2")
    let textFrom = document.querySelector(".from").value
    let langFrom = document.querySelector(".lang-from").value
    let langTo = document.querySelector(".lang-to").value
    console.log(textFrom, langFrom, langTo)
    translate(textFrom, langFrom, langTo)
    
}

function createCookie(name, value, time) {
    document.cookie = `${name}=${value}; max-age = ${time}`
    console.log(document.cookie)
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split('=')
        if (parts[0] == name) {
            console.log(parts[0])
            return parts[1]
        }
    }
}
document.querySelector(".strelochki").onclick = function() {
    console.log("4")
    let langFromBefore = document.querySelector(".lang-from").value
    document.querySelector(".lang-from").value = document.querySelector(".lang-to").value
    document.querySelector(".lang-to").value = langFromBefore
    console.log(document.querySelector(".lang-from").value)
}
async function translate(text, langFrom, langTo) {
    let to = document.querySelector(".to")
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${langFrom}|${langTo}`);
    let data = await response.json();
    console.log(data.responseData.translatedText)
    to.value =  data.responseData.translatedText
}
