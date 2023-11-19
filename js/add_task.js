let addedSubtasks = [];
let isFormValidated = false;

/**
 * This is the main function that gets the two arrays from remote storage and generates a needed array.
 */
async function main() {
    let contactsInTask = [];
    await getContactsFromStorage();
    await getCategoriesFromStorage();
    for (let j = 0; j < Contacts.length; j++) {
        const contact = Contacts[j];
        let addedContactFirstName = contact['firstName'];
        let addedContactLastName = contact['lastName'];
        let addedContactToTask = {
            "firsName": addedContactFirstName,
            "lastName": addedContactLastName,
            "added": 'no'
        };
        contactsInTask.push(addedContactToTask);
    }
    window.addedContacts = contactsInTask;
}

/**
 * This function checks for assigned users to the task and makes them a global variable to later be added to the array "Cards". 
 */
function addTheUsers() {
    let usersToBeAdded = [];
    let fullNamesToBeAdded = [];
    for (let t = 0; t < addedIds.length; t++) {
        const element = addedIds[t];
        let addedUser = Contacts[element]['firstLetters'];
        usersToBeAdded.push(addedUser);
        let addedUserFullName = Contacts[element]['name'];
        fullNamesToBeAdded.push(addedUserFullName);
    };
    window.addedUsers = usersToBeAdded;
    window.addedUsersFullNames = fullNamesToBeAdded;
}

/** 
 * This function makes the priority a global variable to later be added to the array "Cards".
 */
function setPriority() {
    if (priority == '0') { window.prio = "Urgent" };
    if (priority == '1') { window.prio = "Medium" };
    if (priority == '2') { window.prio = "Low" };
}

/** 
 * This function gets all the values from the input fields and generates an object that is later going to be added to the array "Cards".
 */
function generateNewTaskObject(currentListType) {
    let inputTitle = document.getElementById('addTaskTitle').value;
    let description = document.getElementById('descriptionTextArea').value;
    let dueDate = document.getElementById('date').value;
    let theTaskToBeAdded = {
        "category": `${categories[theChosenCategory]['name']}`,
        "title": inputTitle,
        "description": description,
        "progress": "0",
        "assignedUser": addedUsers,
        "assignedUserFullName": addedUsersFullNames,
        "prio": prio,
        "dueDate": dueDate,
        "subtasks": subtasks,
        "listType": currentListType,
    };
    window.theNewTask = theTaskToBeAdded;
}

/** 
 * This function navigates to board.html with a timer of 1500 milliseconds.
 */
function navigateToBoard() {
    setTimeout(() => {
        document.location.href = "board.html";
    }, 1500);
}

/** 
 * This function generates and saves the card in to the remote storage with help of all the small help-functions that are called inside of it.
 */
async function addTaskToBoard(currentListType) {
    checkForInput();
    if (isFormValidated) {
        addTheUsers();
        setPriority();
        if (addedSubtasks.length == '0') { subtasks = [] };
        generateNewTaskObject(currentListType);
        await getCardsFromStorage();
        cards.push(theNewTask);
        saveCardsToStorage();
        showTaskCreationSuccess();
        navigateToBoard();
    }
}

/** 
 * This function validates the input before allowing the card to be saved to remote storage.
 */
function checkForInput() {
    if (typeof theChosenCategory === 'undefined') {
        document.getElementById('FieldCategory').style.display = 'block';
        return 0;
    }
    else if (typeof addedIds === 'undefined') {
        document.getElementById('FieldContact').style.display = 'block';
        return 0;
    }
    else if (typeof priority === 'undefined') {
        document.getElementById('PrioCategory').style.display = 'block';
        return 0;
    } else {
        isFormValidated = true;
    }
}

/** 
 * This function generates the drop down menu with the avaliable categories.
 */
function openCategoryDropDown() {
    let categoryMainContainer = document.getElementById('category');
    categoryMainContainer.innerHTML = "";
    categoryMainContainer.innerHTML += categoryTemplate();
    let categoryContainer = document.getElementById('addCategory');
    categoryContainer.innerHTML = "";
    categoryContainer.innerHTML += openDropdownTemplate();
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        categoryContainer.innerHTML += categorySelectTemplate(element, i);
    }
}

/** 
 * This function generates the input field and color choice for the addition of a category.
 */
function openCategoryInput() {
    let categoryContainer = document.getElementById('addCategory');
    categoryContainer.innerHTML = "";
    let categoryMainContainer = document.getElementById('category');
    categoryMainContainer.innerHTML = categoryInputTemplate();
    renderSelectableCategoryColors();
}

/** 
 * This function closes the category input field without selecting a category.
 */
function closeCategoryInput() {
    document.getElementById('category').innerHTML = closeCategoryTemplate();
}

/** 
 * This function closes the category input field and returns a global variable of the chosen category.
 */
function selectedCategory(x) {
    let element = categories[x];
    document.getElementById('category').innerHTML = categoryDropdownTemplate(element);
    window.theChosenCategory = x;
}

/** 
 * This function renders the available colors to assign to the newly created category.
 */
function renderSelectableCategoryColors() {
    let selectableColorsMainDIV = document.getElementById('selectable_category_colors');
    selectableColorsMainDIV.innerHTML = "";
    for (let y = 0; y < categoryColors.length; y++) {
        const element = categoryColors[y];
        selectableColorsMainDIV.innerHTML += selectColorTemplate(element);
    }
}

/** 
 * This function returns a global variable of the selected color for the new category.
 */
function selectedCategoryColor(x) {
    renderSelectableCategoryColors();
    window.newCategoryColor = x;
    let selectedColorContainer = document.getElementById(`circle_${x}`);
    selectedColorContainer.classList.add('stroke-width-2');
}

/** 
 * This function creates and adds the new category to remote storage.
 */
async function addCategory() {
    let categoryNameInput = document.getElementById('added_category_name').value;
    categoryValue = categoryNameInput.toLowerCase();
    let newCategory = {
        name: categoryNameInput,
        color: newCategoryColor,
        value: categoryValue,
    };
    categories.push(newCategory);
    openCategoryDropDown();
    await saveCategoriesToStorage()
    await getCardsFromStorage()
}

/** 
 * This function initializes the selectable contacts drop down list. 
 */
function openDropdownContact() {
    openTranspOverlay();
    removeClassTranspOverlay();
    generateOpenAddContactMainContainer();
    selectUserDropdown();
}

/** 
 * This function generates the selectable contacts drop down list. 
 */
function selectUserDropdown() {
    let addContactContainer = document.getElementById('addContact');
    addContactContainer.innerHTML = "";
    for (let j = 0; j < Contacts.length; j++) {
        const element = Contacts[j];
        const element2 = addedContacts[j];
        const theValue = 'yes';
        if (element2['added'] == theValue) {
            generateSelectedContact(j, element);
            currentUserCheck(j);
        }
        else {
            generateUnselectedContact(j, element);
            currentUserCheck(j);
        }
    }
}

/** 
 * This function generates the empty body of the selectable contacts list.
 */
function generateOpenAddContactMainContainer() {
    let addContactMainContainer = document.getElementById('assigned_to');
    addContactMainContainer.innerHTML = "";
    addContactMainContainer.innerHTML += selectContactTemplate();
}

/** 
 * This function generates the contacts that have not been added to the selected contacts list.
 */
function generateUnselectedContact(j, element) {
    let addContactContainer = document.getElementById('addContact');
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    addContactContainer.innerHTML += unselectedUserTemplate(j, element, firstTwoLetters);
}

/** 
 * This function generates the contacts that have been added to the selected contacts list. 
 */
function generateSelectedContact(j, element) {
    let addContactContainer = document.getElementById('addContact');
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    addContactContainer.innerHTML += selectedUserTemplate(j, element, firstTwoLetters);
}

/** 
 * This function generates a transparent overlay that is used to close the dropdown contact list 
 */
function openTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.style.display = "block";
}

/** 
 * This function closes the dropdown contact list and at the same time removes the transparent overlay that is used to close that same list 
 */
function closeTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.style.display = "none";
    if (!transparentOverlay.classList.contains("dropdownclosed")) {
        closeDropdownContact();
    }
}

/** 
 * This is a help function that adds a certain classlist to the corresponding object id  
 */
function classToTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.classList.add("dropdownclosed");
}

/** 
 * This is a help function that removes a certain classlist to the corresponding object id  
 */
function removeClassTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.classList.remove("dropdownclosed");
}

/** 
 * This function finds the currently logged in user in the contacts list, 
 * and adds the word (You) next to the same contact when generating the contacts 
 */
function currentUserCheck(j) {
    let currentUserLabel = document.getElementById(`currentUserCheck${j}`);
    if (currentUser < Contacts.length) {
        if (Contacts[currentUser]['name'] == Contacts[j]['name']) {
            currentUserLabel.innerHTML = "(You)";
        }
    }
}

/** This function generates two arrays from the added contacts to the task. 
 * The first array is for the first and last name of the added contact,
 * and the second array is for the ids from the array Contacts, of the added contacts to the task. 
 */
function addContactToTask() {
    let addedContactsToTask = [];
    let addedIdsToTask = [];
    getContactsFromStorage();
    saveSelectedUser(addedContactsToTask, addedIdsToTask);
    window.addedContacts = addedContactsToTask;
    window.addedIds = addedIdsToTask;
}

/** 
 * This function saves the selected user to new arrays.
 */
function saveSelectedUser(addedContactsToTask, addedIdsToTask) {
    for (let z = 0; z < Contacts.length; z++) {
        const checkbox = document.getElementById("checkBox_" + z);
        const contact = Contacts[z];
        let addedContactFirstName = contact['firstName'];
        let addedContactLastName = contact['lastName'];
        if (checkbox.checked) {
            generateTheAddedContact(contact, addedContactFirstName, addedContactLastName);
            addedContactsToTask.push(addedContactToTask);
            addedIdsToTask.push(z);
        }
        else {
            generateTheNotAddedContact(contact, addedContactFirstName, addedContactLastName);
            addedContactsToTask.push(addedContactToTask);
        }
    }
}

/** 
 * This function generates the object to be added to the addedContactsToTask array from the assigned contact.
 */
function generateTheAddedContact(contact, addedContactFirstName, addedContactLastName) {
    let theAddedContact = { "firstName": addedContactFirstName, "lastName": addedContactLastName, "added": 'yes', };
    window.addedContactToTask = theAddedContact;
}

/** 
 * This function generates the object to be added to the addedContactsToTask array from the unassigned contact.
 */
function generateTheNotAddedContact(contact, addedContactFirstName, addedContactLastName) {
    let theAddedContact = { "firstName": addedContactFirstName, "lastName": addedContactLastName, "added": 'no', };
    window.addedContactToTask = theAddedContact;
}

/** 
 * This funtion closes the drop down menu and generates the button for openning the same menu for the selection of a contact from the contact list.
 */
function closeDropdownContact() {
    addContactToTask();
    let addContactMainContainer = document.getElementById('assigned_to');
    addContactMainContainer.innerHTML = "";
    addContactMainContainer.innerHTML += closeDropdownContactTemplate();
    renderAddedContactLabels();
    classToTranspOverlay();
}

/** 
 * This function renders the nametags of the selected contacts.
 */
function renderAddedContactLabels() {
    let addContactMainContainer = document.getElementById('assigned_to');
    addContactMainContainer.innerHTML += contactsNameTagsTemplate();
    for (let p = 0; p < addedContacts.length; p++) {
        const element = addedContacts[p];
        let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
        let addedContactsNameTagsMain = document.getElementById('added_contacts_name_tags_main');
        if (element['added'] == 'yes') {
            addedContactsNameTagsMain.innerHTML += nameTagsTemplate(p, firstTwoLetters);
        }
    }
}

/** 
 * This function checks the checkbox and changes the appearance of the contact in the contact list depending on if the contact has been added to the task or not.
 */
function selectedContact(y) {
    let checkBox = document.getElementById(`checkBox_${y}`);
    checkBox.click();
    let selectedBox = document.getElementById(`addTaskContact_${y}`);
    let hasTheClass = selectedBox.classList.contains('col_2A3647');
    if (hasTheClass) {
        selectedBox.classList.remove('col_2A3647');
    } else {
        selectedBox.classList.add('col_2A3647');
    }
}

/** 
 * This function toggles the active state prio options  
 */
function addActiveState(j) {
    let btnsTip = document.getElementById('prioButtons').getElementsByClassName('SubTaskPrios');
    if (btnsTip[j].classList.contains('active-state')) {
        btnsTip[j].classList.remove('active-state');
    }
    else {
        for (i = 0; i < btnsTip.length; i++) {
            btnsTip[i].classList.remove('active-state');
        };
        btnsTip[j].classList.add('active-state');
    }
    let priorityNumber = j;
    window.priority = priorityNumber;
};

/** 
 * This function generates the input field for the creation of new subtask.
 */
function openSubtaskInput() {
    let addSubtaskContainer = document.getElementById('addNewSubtask');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML += subTaskInputTemplate();
}

/** 
 * This function closes the subtask input field and generates the button for the opening of the addition of a new subtask.
 */
function cancelSubtaskInput() {
    let addSubtaskContainer = document.getElementById('addNewSubtask');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML = subTaskBlankTemplate();
}

/** 
 * This function generates the container with the added subtask, also creates an entry in the addedSubtasks array with the newly added subtask.
 */
function addSubtask() {

    let addSubtaskContainer = document.getElementById('addNewSubtask');
    let addedSubtaskNameInput = document.getElementById('added_subtask').value;
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML = subTaskBlankTemplate();
    generateTheNewSubtask(addedSubtaskNameInput);
    let addedSubtask = {
        "nameSub": addedSubtaskNameInput,
        "status": "unchecked"
    };
    addedSubtasks.push(addedSubtask);
    window.subtasks = addedSubtasks;
}

/** 
 * This function generates the container with the added subtask. 
 */
function generateTheNewSubtask(addedSubtaskNameInput) {
    let subtaskMain = document.getElementById('subtask_main');
    subtaskMain.innerHTML += subTaskMaskTemplate(addedSubtaskNameInput, subtaskMain);
}

/** 
 * This function generates and animates the small floating info-box at the task creation success.
 */
function showTaskCreationSuccess() {
    let theContainerToShow = document.getElementById('task_creation_success');
    theContainerToShow.classList.remove('d-none');
    theContainerToShow.classList.add('frame_73_animate');
}