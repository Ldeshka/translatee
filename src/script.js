async function translate(text, langFrom, langTo) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${langFrom}|${langTo}`);
    let data = await response.json();
    console.log(data.responseData.translatedText)
}
translate("Hello, how are you?", "en", "uk")
translate("Hello, do you want to hang out tomorrow? I have some free time.", "en", "zh")
translate("Hello, can i borrow your bike? I'll return it later.", "en", "pl")