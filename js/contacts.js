let Contacts = []

let nameTagsColors = ['#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700', '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700', '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700', '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700'];

let firstLetters = [];

let addNewContactButton = newContactBtnTemplate();

/** 
 * This function goes through the entire length of the array Contacts and gets the initials of the saved contact. 
 */
function getFirstLetters() {
    let allFirstLetters = [];
    for (let j = 0; j < Contacts.length; j++) {
        const element = Contacts[j];
        const firstNameLetter = element['firstName'].charAt(0);
        allFirstLetters.push(firstNameLetter);
    }
    let uniqueChars = allFirstLetters.filter((element, index) => {
        return allFirstLetters.indexOf(element) === index;
    });
    firstLetters.push(uniqueChars);
}

/**
 * This is a help function used to make the function renderContactsList cleaner and more readable. 
 * It is used to generate the HTML code that displays the contacts in the contact list that go after the letter tab separator as well as to generate that same letter tab separator. 
 * 
 * 
 * @param {string} element This parameter is the variable that is defined in a for loop and used in the other function that is calling this function. 
 *                          The value is the corresponding object from the array Contacts.
 * 
 * @param {string} firstLetter This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              The value is the first letter of the name from the person in the corresponding object from the array Contacts.
 *                              It is used to generate the letter tab separator.
 * 
 * @param {*} firstTwoLetters This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              The value is first letter of the name and surname from the person in the corresponding object from the array Contacts.
 *                              It is used to generate the name tag of the person in the contact list.  
 * 
 * @param {*} contactsList  This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              It is used to address a certain html element with the corresponding id.
 * 
 * @param {*} i This parameter is the index that corresponds to the sequence number in a for loop that runs in the function that is calling this function.
 *              It is used to generate certain elements from the same index in the array Contacts.
 */
function renderContactWithLetterSeparator(element, firstLetter, firstTwoLetters, contactsList, i) {
    contactsList.innerHTML += contactListTemplate(element, firstLetter, firstTwoLetters, contactsList, i);
}

/**
 * This is a help function used to make the function renderContactsList cleaner and more readable. 
 * It is used to generate the HTML code that displays the contacts in the contact list that go right after the first contact in a alphabetically sorted contact group. 
 * 
 * 
 * @param {string} element This parameter is the variable that is defined in a for loop and used in the other function that is calling this function. 
 *                          The value is the corresponding object from the array Contacts.
 * 
 * @param {*} firstTwoLetters This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              The value is first letter of the name and surname from the person in the corresponding object from the array Contacts.
 *                              It is used to generate the name tag of the person in the contact list.  
 * 
 * @param {*} contactsList  This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              It is used to address a certain html element with the corresponding id.
 * 
 * @param {*} i This parameter is the index that corresponds to the sequence number in a for loop that runs in the function that is calling this function.
 *              It is used to generate certain elements from the same index in the array Contacts.
 */
function renderContactWithoutLetterSeparator(element, firstTwoLetters, contactsList, i) {
    contactsList.innerHTML += contactIconTemplate(element, firstTwoLetters, contactsList, i);
}

/** 
 * This function is being used to generate and display the contacts list and all of its inside elements, including the add new contact button, letter tab separators etc..
 */
async function renderContactsList() {
    await getContactsFromStorage();
    sortContactsAlphabetically(Contacts);
    let contactsList = document.getElementById('contacts_list');
    contactsList.innerHTML = "";
    contactsList.innerHTML += addNewContactButton;
    for (let i = 0; i < Contacts.length; i++) {
        let element = Contacts[i];
        let firstLetter = element['firstName'].charAt(0);
        let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
        let letterTab = document.getElementById(`letter_${firstLetter}`);
        if (!letterTab) {
            renderContactWithLetterSeparator(element, firstLetter, firstTwoLetters, contactsList, i);
        } else {
            renderContactWithoutLetterSeparator(element, firstTwoLetters, contactsList, i);
        }
    }
}

/** 
 * This function is being used for the animation of the detailed contact card. 
 */
function animateContactCard() {
    let contactCardContainer = document.getElementById('floating_contact');
    contactCardContainer.classList.remove('floating-contact-animate');
    void contactCardContainer.offsetWidth;
    contactCardContainer.classList.add('floating-contact-animate');
}

/** 
 * This function is used for the display of the detailed contact card. 
 */
async function showContactDetails(x) {
    await markActiveContact(x);
    let contact = document.getElementById(`contact_${[x]}`);
    let contactNameContainer = document.getElementById(`contact_name_${[x]}`);
    let contactCardContainer = document.getElementById('floating_contact');
    let element = Contacts[x];
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    contact.classList.add('background-color-2A3647', 'pointer-events-none');
    contactNameContainer.classList.add('color-FFFFFF');
    animateContactCard();
    renderContactDetails(x, element, contactCardContainer, firstTwoLetters);
    displayContact();
}

/**
 * This function is called from the showContactDetails function. It generates the HTML code that renders and displays the detailed contact card.
 * 
 * @param {number} x This parameter is the variable that is used to address certain elements and keys that correspond to the object in the array Contacts with the same index.
 *  
 * @param {string} element This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                         The value is the corresponding object from the array Contacts.
 * 
 * @param {string} contactCardContainer  This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                                       It is used to address a certain html element with the corresponding id.
 * 
 * @param {string} firstTwoLetters This parameter is the variable that is defined and used in the other function that is calling this function.
 *                                 It is used to generate the first letter of the name and surname of the person in the corresponding object in the array Contacts,
 *                                 for generating the name tag.
 */
function renderContactDetails(x, element, contactCardContainer, firstTwoLetters) {
    contactCardContainer.innerHTML = "";
    contactCardContainer.innerHTML += contactDetailTemplate(x, element, contactCardContainer, firstTwoLetters);
}

/**
 * This function is used to mark the selected/active contact from the contacts list.
 * @param {number} x This parameter is the corresponding index number of the object in the array Contacts.
 */
async function markActiveContact(x) {
    await renderContactsList();
    let contact = await document.getElementById(`contact_${[x]}`);
    await contact.classList.add('background-color-2A3647', 'pointer-events-none');
}

/** 
 * This function is used to show the contact details in the mobile version of the webpage. 
 */
function displayContact() {
    let displayContacts = document.getElementById('contact-page');
    displayContacts.style = "display:block; position:relative;";
}

/** 
 * This function closes the contact details and returns to the contacts list in the mobile version of the webpage 
 */
function backToContacts() {
    let displayContacts = document.getElementById('contact-page');
    displayContacts.style = "display:none; position:relative;";
}

/** 
 * This function opens the edit contact menu in the mobile version of the webpage 
 */
function showContactEditMenu() {
    let subMenu = document.getElementById('edit-contact');
    let editOverlay = document.getElementById('editcontactoverlay');
    if (subMenu.style.display == "none") {
        subMenu.style = "display: block;";
        editOverlay.style = "display: block;";
    }
    else {
        subMenu.style = "display: none;";
    };
}

/** 
 * This function closes the edit contact menu in the mobile version of the webpage 
 */
function closeEditOverlay() {
    let subMenu = document.getElementById('edit-contact');
    let editOverlay = document.getElementById('editcontactoverlay');
    editOverlay.style = "display: none;";
    subMenu.style = "display: none;";
}

/**
 * This function is used to delete a contact from the contacts list 
 */
function deleteContact(x) {
    if (x === currentUser) {
        alert('Du kannst dich nicht selber löschen')
    } else {
        Contacts.splice(x, 1);
        if (currentUser > x && currentUser !== 1000) {
            currentUser--
            localStorage.setItem('currentUser', currentUser);
        };
        document.getElementById('floating_contact').innerHTML = '';
        saveContactsToStorage();
        renderContactsList();
    }
}

/** 
 * This function generates the HTML code used to display the add new contact overlay container.  
 */
function renderAddNewContact() {
    let overlayNewContact = document.getElementById('overlay_new_contact');
    overlayNewContact.classList.remove('d-none');
    overlayNewContact.innerHTML = addContactForm();
}

/** 
 * This function closes the add new contact overlay without saving the changes anywhere. 
 */
function closeNewContact() {
    let newContactOverlayDiv = document.getElementById('overlay_new_contact');
    let newContactMainDiv = document.getElementById('new_contact_main');
    newContactMainDiv.classList.add('close-new-contact-animate');
    setTimeout(() => {
        void newContactOverlayDiv.offsetWidth;
        newContactOverlayDiv.classList.add('d-none');
        newContactMainDiv.classList.remove('close-new-contact-animate')
    }, "220");
}

/** 
 * This is a generic all-purpose function that is used to stop the propagation of a certain function  
 */
function doNotClose(event) {
    event.stopPropagation();
}

/** 
 * This function gets all values from the input fields and does certain checks before saving the new contact in the Contacts array
 */
async function createNewContact() {
    let nameInput = document.getElementById('add_contact_name').value;
    if (checkTwoWords(nameInput)) {
        let nameArray = nameInput.split(' ');
        let firstName = nameArray[0];
        let lastName = nameArray[1];
        let emailInput = document.getElementById('add_contact_email').value;
        let phoneInput = document.getElementById('add_contact_phone').value;
        let firstTwoLetters = firstName.charAt(0) + lastName.charAt(0);
        let newContact = newContactJson(firstName, lastName, phoneInput, emailInput, firstTwoLetters, nameInput);
        let alreadyUser = 0;
        for (let m = 0; m < Contacts.length; m++) {
            if (Contacts[m]["email"] == emailInput) {
                document.getElementById('messageExistingContact').style.display = 'block';
                alreadyUser = 1;
                break;
            } else { break }
        }
        if (alreadyUser != 1) {
            await saveNewContact(newContact, emailInput);
        }
    }
}

/** 
 * JSON to create new contact.
 */
function newContactJson(firstName, lastName, phoneInput, emailInput, firstTwoLetters, nameInput) {
    return {
        "firstName": firstName,
        "lastName": lastName,
        "phone": phoneInput,
        "email": emailInput,
        "color": "black",
        "firstLetters": firstTwoLetters,
        "name": nameInput,
        "password": '1234',
    };
}

/** 
 * This function saves the new contact and reloads the contact list.
 */
async function saveNewContact(newContact, emailInput) {
    Contacts.push(newContact);
    sortContactsAlphabetically(Contacts);
    await saveContactsToStorage();
    let theIndex = Contacts.findIndex(x => x.email === emailInput);
    closeNewContact();
    await renderContactsList();
    let theNewId = findContactIdByEmail(Contacts, emailInput);
    target = document.getElementById(`contact_${theNewId}`);
    setTimeout(() => {
        scrollToNewContact('contacts_list', `contact_${theNewId}`);
        setTimeout(() => {
            target.click();
        }, "550");
    }, "550");
}

/**
 * Check if the input field contains 2 words
 * @param {string} nameInput 
 * @returns {boolean}
 */
function checkTwoWords(nameInput) {
    let words = nameInput.trim().split(' ');
    if (words.length !== 2) {
        name_Alert.textContent = "Bitte Vor- und Nachname eingeben";
        name_Frame.classList.add('redBorder');
        setTimeout(() => { name_Alert.textContent = ""; name_Frame.classList.remove('redBorder'); }, 3000)
        return false;
    } else {
        return true;
    }
}

/** 
 * This function goes sorts the entries in the array contacts alphabetically. It is usualy called from other functions before displaying the contacts list. 
 */
function sortContactsAlphabetically(contacts) {
    contacts.sort((a, b) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

/**
 * This function is used to delete the current user. 
 */
function deleteCurrentUser() {
    let position = Contacts.findIndex(contact => contact.firstName === 'Guest');
    Contacts.splice(position, 1);
    if (currentUser !== 0) {
        let user = Contacts.findIndex(contact => contact.firstName === Contacts[currentUser - 1].firstName);
        Contacts.splice(user, 1);
    }
}

/** 
 * This function goes through the entire array Contacts and finds the correspondig object id by comparing the email address against the entries in the array 
 */
function findContactIdByEmail(contacts, emailToBeFound) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === emailToBeFound) {
            return i;
        }
    }
    return -1;
}

/**
 * This function is used to scroll to the corresponding container id in the contacts list 
 */
function scrollToNewContact(parentId, childId) {
    const parentElement = document.getElementById(parentId);
    const childElement = document.getElementById(childId);

    if (parentElement && childElement) {
        childElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
}

/** 
 * This function generates the HTML code that is used to display the edit contact overlay container 
 */
function renderEditContact(x) {
    let element = Contacts[x];
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    let overlayNewContact = document.getElementById('overlay_new_contact');
    overlayNewContact.classList.remove('d-none');
    overlayNewContact.innerHTML = editContactForm(x, firstTwoLetters);

    document.getElementById('edit_name').value = element['firstName'] + " " + element['lastName'];
    document.getElementById('edit_email').value = element['email'];
    document.getElementById('edit_phone').value = element['phone'];
    let subMenu = document.getElementById('edit-contact');
    subMenu.style = "display: none;";
}

/** 
 * This function deletes a contact from the array Contacts with the corresponding object id that is transferred as the "x" parameter 
 */
async function deleteContactFromEdit(x) {
    deleteContact(x);
    closeNewContact();
    await saveContactsToStorage();
    renderContactsList();
}

/**
 * This function gets all the needed input values from the edit contact overlay container, and saves the changes to the correspondig object in the array Container  
 */
function editContact(x) {
    let nameInput = document.getElementById('edit_name').value;
    let nameArray = nameInput.split(' ');
    let newFirstName = nameArray[0];
    let newLastName = nameArray[1];
    let newEmail = document.getElementById('edit_email').value;
    let newPhone = document.getElementById('edit_phone').value;
    let element = Contacts[x];
    element.firstName = newFirstName;
    element.lastName = newLastName;
    element.email = newEmail;
    element.phone = newPhone;
    element.name = nameInput;
    saveContactsToStorage();
    closeNewContact();
    renderContactsList();
    document.getElementById('floating_contact').innerHTML = "";
    showContactDetails(x)
}