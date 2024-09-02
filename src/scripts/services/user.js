import { baseUrl } from "../variables.js";

// Busca o usuario pelo user name
async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`);
    return await response.json();
}

export { getUser }