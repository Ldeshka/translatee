
let placeholderbtn = document.querySelector(".btn")
console.log("1")
placeholderbtn.onclick = function() {
    console.log("2")
    let textFrom = document.querySelector(".from").value
    let langFrom = document.querySelector(".lang-from").value
    let langTo = document.querySelector(".lang-to").value
    console.log(textFrom, langFrom, langTo)
    translate(textFrom, langFrom, langTo)
    
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
