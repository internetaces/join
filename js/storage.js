const STORAGE_TOKEN = 'OAIKJNGYOUF70EXX5IZ2Y40IRQPUZC9BB4UBHPGS';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

//////////////////////////////////// Local storage ////////////////////////////////

/** 
 * Save contacts to local storage. 
 */
function saveContactsToStorage() {
    let contactsAsString = JSON.stringify(Contacts);
    localStorage.setItem('contacts', contactsAsString);
}

/** 
* Load contacts from local storage. 
*/
function getContactsFromStorage() {
    let contactsAsString = localStorage.getItem('contacts');
    if (contactsAsString) {
        Contacts = JSON.parse(contactsAsString);
    }
}

/** 
 * Save cards to local storage. 
 */
function saveCardsToStorage() {
    let cardsAsString = JSON.stringify(cards);
    localStorage.setItem('cards', cardsAsString);
}

/** 
* Load cards from local storage. 
*/
function getCardsFromStorage() {
    let cardsAsString = localStorage.getItem('cards');
    if (cardsAsString) {
        cards = JSON.parse(cardsAsString);
    }
}

//////////////////////////////////// Remote storage ////////////////////////////////

/** 
 * Save contacts to remote storage. 
 */
async function saveContactsToStorage() { 
    let key = 'contacts';
    let value = Contacts;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

/** 
* Load contacts from remote storage. 
*/
async function getContactsFromStorage() {
    let key = 'contacts';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
            Contacts = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

/** 
 * Save cards to remote storage. 
 */
async function saveCardsToStorage() { 
    let key = 'cards';
    let value = cards;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

/** 
* Load cards from remote storage. 
*/
async function getCardsFromStorage() { 
    let key = 'cards';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
            cards = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

/** 
* Save categories to remote storage. 
*/
async function saveCategoriesToStorage() { // Name muss dann angepasst werden
    let key = 'categories';
    let value = categories;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

/** 
* Load categories from remote storage. 
*/
async function getCategoriesFromStorage() { // Name muss dann angepasst werden
    let key = 'categories';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.data) {
            categories = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}