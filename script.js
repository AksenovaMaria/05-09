const form = document.getElementById("search-form");
const inputUser = document.getElementById("search-input");
const seachResult = document.getElementById("search-result");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = inputUser.value // значение, которое ввел пользователей
    getDataUserGitHub(user);

})

async function getDataUserGitHub(username) {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        console.log(data);
        userOutputData(data);
    }
    catch (e) {
        displayError(e)

    }


    function userOutputData(userData) {
        inputUser.value = "";
        seachResult.innerHTML = "";


        if (userData.login == undefined) {
            seachResult.innerHTML = "<span class = 'error'>Пользователь не найден</span>";
            return;
        }

        const profileCard = document.createElement("div");
        profileCard.classList.add("profile");


        // работа с аватаркой
        const avatar = document.createElement("img");
        avatar.src = userData.avatar_url;
        avatar.alt = `Фото ${userData.login} не найдено`;

        // имя
        const nameUser = document.createElement("h2");
        nameUser.textContent = userData.name || userData.login;

        // описание

        const bioUser = document.createElement('div');
        bioUser.textContent = `Описание: ${userData.bio || "нет данных"}`;

        //ссылка на аккаунт 
        const userLinkBlock = document.createElement('div');
        userLinkBlock.innerHTML = `Ссылка на аккаунт пользователя:  <a class="user__link" target="_blank" href=${userData.html_url}>${userData.html_url}</a>`;




        profileCard.append(userLinkBlock); // выводим ссылку на профиль 
        profileCard.append(bioUser); // выводим описания пользователя
        profileCard.append(nameUser); // выводим имя или логин пользователя
        profileCard.append(avatar); // вывели аватарку на страницу
        seachResult.append(profileCard);
    }

    function displayError(e) {
        seachResult.textContent = e;
        seachResult.classList.add("error");
    }


}