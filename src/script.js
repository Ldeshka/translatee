// --- Селектори ---
const placeholderBtn = document.querySelector(".trans-btn");
const formBtn = document.querySelector(".submit-btn");
const logoutBtn = document.querySelector(".logout-btn"); // Кнопка реєстрації/виходу
const article = document.querySelector(".main-body");
const formBlock = document.querySelector(".form");
const strelochki = document.querySelector(".strelochki");

const nameInput = document.querySelector(".name-input");
const passInput = document.querySelector(".password-input");

const textAreaFrom = document.querySelector(".from");
const textAreaTo = document.querySelector(".to");
const selectFrom = document.querySelector(".lang-from");
const selectTo = document.querySelector(".lang-to");

// --- Логіка ініціалізації ---
function checkAuth() {
    if (getCookie("name") && getCookie("password")) {
        article.classList.remove("hide");
        formBlock.classList.add("hide");
    } else {
        article.classList.add("hide");
        formBlock.classList.remove("hide");
    }
}

checkAuth();

// --- Авторизація ---
formBtn.onclick = function() {
    if (nameInput.value.trim() !== "" && passInput.value.trim() !== "") {
        createCookie("name", nameInput.value, 100000);
        createCookie("password", passInput.value, 100000);
        checkAuth();
    } else {
        alert("Будь ласка, заповніть всі поля!");
    }
};

// --- "Зареєструватися" (Вихід) ---
logoutBtn.onclick = function() {
    deleteCookie("name");
    deleteCookie("password");
    nameInput.value = "";
    passInput.value = "";
    checkAuth();
    alert("Ви вийшли з системи для нової реєстрації.");
};

// --- Переклад ---
placeholderBtn.onclick = function() {
    const text = textAreaFrom.value;
    const from = selectFrom.value;
    const to = selectTo.value;

    if (text.trim() !== "") {
        translate(text, from, to);
    }
};

// Реверс мов
strelochki.onclick = function() {
    const tempLang = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = tempLang;
};

async function translate(text, langFrom, langTo) {
    textAreaTo.value = "Перекладаю...";
    
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langFrom}|${langTo}`);
        const data = await response.json();
        
        if (data.responseData) {
            textAreaTo.value = data.responseData.translatedText;
        } else {
            textAreaTo.value = "Помилка API";
        }
    } catch (error) {
        console.error("Помилка:", error);
        textAreaTo.value = "Помилка мережі";
    }
}

// --- Cookie Helpers ---
function createCookie(name, value, time) {
    document.cookie = `${name}=${value}; max-age=${time}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split('=');
        if (parts[0] === name) {
            return parts[1];
        }
    }
    return undefined;
}

function deleteCookie(name) {
    document.cookie = name + '=; max-age=0; path=/';
}