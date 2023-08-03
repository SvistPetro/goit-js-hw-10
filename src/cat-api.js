const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'x-api-key';
const COLL_ENDPOINT = 'breeds';

export default function fetchBreeds() {
    return fetch(`${BASE_URL}${COLL_ENDPOINT}?${API_KEY}`).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

        return resp.json();
    });
}