import axios from "axios";
import styles from "./sass/index.scss";
// import fetchBreeds from './cat-api';

axios.defaults.headers.common["x-api-key"] = "live_twwUMvCaXvvrcD4ruWgDDk2nwCNoo5ZZzndY4D852AwSlkcT7vTR3LqF7Rzn5tGU";

const select = document.querySelector('.breed-select');
const catInform = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

select.addEventListener('input', fetchCatByBreed);

// потім перенести цю функцію//
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'x-api-key';
const CALL_ENDPOINT = 'breeds';
const CAT_ENDPOINT = 'images/';

function fetchBreeds() {
    return fetch(`${BASE_URL}${CALL_ENDPOINT}?${API_KEY}`).then((resp) => {
        if (!resp.ok) {
            error.classList.remove('visually-hidden');
            loader.classList.add('visually-hidden');

            throw new Error(resp.statusText);
        }
        return resp.json();
    });
}

function fetchCatByBreed(breedId) {
    catInform.innerHTML = '';
    select.classList.add('visually-hidden');
    error.classList.add('visually-hidden');
    loader.classList.remove('visually-hidden');
    catInform.classList.remove('container');
    let id = select.value;
    return fetch(`${BASE_URL}${CAT_ENDPOINT}${id}`).then((resp) => {
        
        if (!resp.ok) {
            select.classList.remove('visually-hidden');
            error.classList.remove('visually-hidden');
            loader.classList.add('visually-hidden');
            throw new Error(resp.statusText);
        }

        return resp.json().then((data) => catInform.insertAdjacentHTML('beforeend', addCatContent(data.breeds))).catch(err => console.log(err));
    });
}

//

function addSelectContent(arr) {
    loader.classList.add('visually-hidden');
    select.classList.remove('visually-hidden');
    return arr.map(({reference_image_id, name}) => `<option value="${reference_image_id}">${name}</option>`).join('');
}

function addCatContent(arr) {
    loader.classList.add('visually-hidden');
    select.classList.remove('visually-hidden');
    catInform.classList.add('container');
    return arr.map(({reference_image_id, name, description, temperament}) => `<img class="cat-img" src="https://cdn2.thecatapi.com/images/${reference_image_id}.jpg" alt="${name}" width="500"><div class"cat-inform"><h1 class="cat-name">${name}</h1><p class="cat-desc">${description}</p><h2 class="temperament">Temperament:</h2><p class="cat-temp">${temperament}</p></div>`).join('');
}

fetchBreeds().then((data) => select.insertAdjacentHTML('beforeend', addSelectContent(data))).catch(err => console.log(err));
