import axios from "axios";
import style from "./style.css";
// import fetchBreeds from './cat-api';

axios.defaults.headers.common["x-api-key"] = "live_twwUMvCaXvvrcD4ruWgDDk2nwCNoo5ZZzndY4D852AwSlkcT7vTR3LqF7Rzn5tGU";

const select = document.querySelector('.breed-select');
const catInform = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
// const catImg = document.querySelector('.cat-img');
// const catName = document.querySelector('.cat-name');
// const catDesc = document.querySelector('.cat-desc');
// const catTemp = document.querySelector('.cat-temp');

select.addEventListener('input', fetchCatByBreed);

// потім перенести цю функцію//
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'x-api-key';
const CALL_ENDPOINT = 'breeds';
const CAT_ENDPOINT = 'images/';

function fetchBreeds() {
    return fetch(`${BASE_URL}${CALL_ENDPOINT}?${API_KEY}`).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
}

function fetchCatByBreed(breedId) {
    catInform.innerHTML = '';
    let id = select.value;
    return fetch(`${BASE_URL}${CAT_ENDPOINT}${id}`).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

        return resp.json().then((data) => catInform.insertAdjacentHTML('beforeend', addCatContent(data.breeds))).catch(err => console.log(err));
    });
}

//

function addSelectContent(arr) {
    return arr.map(({reference_image_id, name}) => `<option value="${reference_image_id}">${name}</option>`).join('');
}

function addCatContent(arr) {
    return arr.map(({reference_image_id, name, description, temperament}) => `<img class="cat-img" src="https://cdn2.thecatapi.com/images/${reference_image_id}.jpg" alt="${name}" width="600"><h1 class="cat-name">${name}</h1><p class="cat-desc">${description}</p><h2 class="cat-temp">${temperament}</h2>`).join('');
}

fetchBreeds().then((data) => select.insertAdjacentHTML('beforeend', addSelectContent(data))).catch(err => console.log(err));
