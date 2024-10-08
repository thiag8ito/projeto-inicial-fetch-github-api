import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if (validadeEmptyInput(userName)) return;
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterPressed = key === 13;

    if (isEnterPressed) {
        if (validadeEmptyInput(userName)) return;
        getUserData(userName);
    }
})

function validadeEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do uruário do GitHub')
        return true
    }
};

async function getUserData(userName) {
    const userResponse = await getUser(userName);

    if(userResponse.message === "Not Found") {
        screen.renderNotFound();
        return;
    }

    const eventResponse = await getEvents(userName)
    const repositoriesResponse = await getRepositories(userName);
    console.log(await getUser(userName));
    
    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventResponse)
    screen.renderUser(user);
}