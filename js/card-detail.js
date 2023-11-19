/**
 * open card in detailed view in board
 * @param {number} i - index of the Cards array
 * @param {*} event - help function to prevent from call unwanted function
 */
function openCard(i, event) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('CardDetail').style = "display:block;";
    let cardDetailCat = document.getElementById('cardDetailCat');
    let cardDetailTitle = document.getElementById('cardDetailTitle');
    let cardDetailDesc = document.getElementById('cardDetailDesc');
    let cardDetailDueDate = document.getElementById('cardDetailDueDate');
    let cardDetailPrio = document.getElementById('cardDetailPrio');
    let cardDetailAssignedUser = document.getElementById('cardDetailAssignedUser');
    let cardDetailDelete = document.getElementById('deleteCard');
    let cardDetailEdit = document.getElementById('editCard');
    cardDetailCat.innerHTML = `<div class="cardBoardInsideCategory" id="cardBoardInsideCategoryDetail${i}">${cards[i]['category']}</div>`;
    cardDetailTitle.innerHTML = `${cards[i]['title']}`;
    cardDetailDesc.innerHTML = `${cards[i]['description']}`;
    cardDetailDueDate.innerHTML = `<span class="detlabel">Due date:</span>${cards[i]['dueDate']}`;
    cardDetailPrio.innerHTML = `<span class="detlabel">Priority:</span><div id="priobtndetail">${cards[i]['prio']}<img id="prioImg" src=""></div>`;
    cardDetailAssignedUser.innerHTML = `<div class="cardBoardInsideUserAndPrio FullNameSplit"><div class="InsideUser" id="InsideUserDetail${i}"></div><div id=InsideUserFullName${i}></div></div><div class="cardDetailSubtasksAll"><div class="detlabel" id="SubtaskHeader${i}">Subtasks:</div><div class="cardDetailSubTasks" id="cardDetailSubTasks${i}"></div></div>`;
    cardDetailDelete.innerHTML = `<div onclick='deleteCard(${[i]})'><img src="assets/img/board/delete.svg" class="default"><img src="assets/img/board/delete-blue.svg" class="hover">`;
    cardDetailEdit.innerHTML = `<div onclick='editCard(${[i]})'><img src="assets/img/board/edit.svg">`;
    renderCategoriesAndUser(i);
}

/**
 * Render Categorie and user details
 */
function renderCategoriesAndUser(i) {
    renderBackgroundColorCategoryDetail(i);
    renderAssignedUserInBoardDetail(i);
    renderAssignedUserFullName(i);
    renderSubtasksInBoardDetail(i);
    prioButtonStyle(i);
}

/**
 * render background color for category in detailed card view
 * @param {number} i - index of the Cards array
 */
function renderBackgroundColorCategoryDetail(i) {
    let cat = cards[i]['category'];
    let catClassDet = document.getElementById(`cardBoardInsideCategoryDetail${i}`);
    for (let k = 0; k < categories.length; k++) {
        if (cat == categories[k]['name']) {
            catClassDet.style['background-color'] = categories[k]['color'];
        } else { }
    };
}

/**
 * render assigned user in card detailed view
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserInBoardDetail(i) {
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        document.getElementById(`InsideUserDetail${i}`).innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>
            `;
    }
}

/**
 * render subtasks in detailed view of card
 * @param {number} i - index of the Cards array
 */
function renderSubtasksInBoardDetail(i) {
    if (cards[i]['subtasks'].length > 0) {
        for (let j = 0; j < cards[i]['subtasks'].length; j++) {
            document.getElementById(`cardDetailSubTasks${i}`).innerHTML += subtasksCardTemplate(i,j);
        }
    } else {
        subHead = document.getElementById(`SubtaskHeader${i}`);
        subHead.classList.add('d-none');
    }
}

/**
 * open dropdown menu for contacts in board card
 * @param {number} i - index of the Cards array
 */
function openDropdownContact2(i) {
    let addContactDropdown = document.getElementById('selectuser');
    let selectBoxActivated = document.getElementById('selectbox');
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    addContactDropdown.innerHTML = "";
    if (addContactDropdown.style.display == "none") {
        addContactDropdown.style = "display: flex;";
        selectBoxActivated.classList.add('active');
    }
    else {
        addContactDropdown.style = "display: none;";
        selectBoxActivated.classList.remove('active');
    };
    showAssignedUserOfCard(i);
    openTransparentOverlay();
}

/**
 * Render assigned user in dropdown and add class
 */
function showAssignedUserOfCard(i) {
    for (p = 0; p < Contacts.length; p++) {
        loadAssignedUserToForm(i, p);
        if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
            let addClassAssignedUser = document.getElementById(`addusercard${p}`);
            addClassAssignedUser.classList.add('added');
            let changeCheckboxImg = document.getElementById(`userchecked${p}`);
            changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
        };
    }
}

/**
 * add user to card
 * @param {number} i - index of the Cards array
 * @param {*} p 
 */
function addUser(i, p) {
    let indexOfUser = cards[i]['assignedUserFullName'].indexOf(Contacts[p]['name']);
    let addClassAssignedUser = document.getElementById(`addusercard${p}`);
    let changeCheckboxImg = document.getElementById(`userchecked${p}`);
    if (indexOfUser == -1) {
        addNewUser(i, p, addClassAssignedUser, changeCheckboxImg);
    }
    else if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
        removeUser(i, p, indexOfUser, addClassAssignedUser, changeCheckboxImg);
    };
}

/**
 * Assigned user dropdown: Add selected user to card.
 */
function addNewUser(i, p, addClassAssignedUser, changeCheckboxImg) {
    cards[i]['assignedUser'].push(Contacts[p]['firstLetters']);
    cards[i]['assignedUserFullName'].push(Contacts[p]['name']);
    addClassAssignedUser.classList.add('added');
    changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
}

/**
 * Assigned user dropdown: Remove selected user from card.
 */
function removeUser(i, p, indexOfUser, addClassAssignedUser, changeCheckboxImg) {
    cards[i]['assignedUser'].splice(indexOfUser, 1);
    cards[i]['assignedUserFullName'].splice(indexOfUser, 1);
    addClassAssignedUser.classList.remove('added');
    changeCheckboxImg.src = "assets/img/board/checkbox-unchecked.svg";
}

/**
 * open dropdown search menu 
 * @param {number} i - index of the Cards array 
 */
function openDropdownSearch(i) {
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    let addContactDropdown = document.getElementById('selectuser');
    addContactDropdown.style = "display: flex;";
    addContactDropdown.innerHTML = "";
    openTransparentOverlay();
    findContacts(i, findContactFormatted);
}

/**
 * Assigned user search
 */
function findContacts(i, findContactFormatted) {
    for (p = 0; p < Contacts.length; p++) {
        if (Contacts[p]['name'].toLowerCase().includes(findContactFormatted)) {
            loadAssignedUserToForm(i, p);
            openTransparentOverlay();
            if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
                let addClassAssignedUser = document.getElementById(`addusercard${p}`);
                addClassAssignedUser.classList.add('added');
                let changeCheckboxImg = document.getElementById(`userchecked${p}`);
                changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
            };
        }
    }
}

/**
 * load assigned user to form
 * @param {number} i - index of the Cards array
 * @param {*} p 
 */
function loadAssignedUserToForm(i, p) {
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    let addContactDropdown = document.getElementById('selectuser');
    if (Contacts[p]['name'].toLowerCase().includes(findContactFormatted)) {
        addContactDropdown.innerHTML += assignedUserFormTemplate(i, p);
    }
}

/**
 * set style of priority button according to choosen priority
 */
function prioButtonStyle(i) {
    let prioBtnDetail = document.getElementById('priobtndetail');
    let prioBtnDetailImg = document.getElementById('prioImg');
    for (y = 0; y < cards.length; y++) {
        prioBtnDetail.classList.remove('prio-high-btn', 'prio-med-btn', 'prio-low-btn');
        prioBtnDetailImg.src = "";
    };
    if (cards[i]['prio'] == "Urgent") {
        prioBtnDetail.classList.add('prio-high-btn');
        prioBtnDetailImg.src = "assets/img/addtask/prio-high-w.svg";

    } else 
    if (cards[i]['prio'] == "Medium" || cards[i]['prio'] == "Mid") {
            prioBtnDetail.classList.add('prio-med-btn');
            prioBtnDetailImg.src = "assets/img/addtask/prio-medium-w.svg";
    } else
    if (cards[i]['prio'] == "Low") {
            prioBtnDetail.classList.add('prio-low-btn');
            prioBtnDetailImg.src = "assets/img/addtask/prio-low-w.svg";
    }
}

/**
 * Creates a transparent overlay on card
 */
function openTransparentOverlay() {
    let transparentOverlay = document.getElementById('overlaytransparent');
    transparentOverlay.style.display = "block";
}

/**
 * Close dropdown by click on transparent overlay
 */
function closeTransparentOverlay() {
    removeDropDownClass();
    let transparentOverlay = document.getElementById('overlaytransparent');
    transparentOverlay.style.display = "none";
}

/**
 * Closes the dropdown
 */
function removeDropDownClass() {
    let addContactDropdown = document.getElementById('selectuser');
    addContactDropdown.style = "display: none;";
}

/**
 * Render assigned user in edit card form.
 * @param {number} i - index of the Cards array
 */
function loadAssignedUserEditForm(i) {
    let assignedUserEditForm = document.getElementById('assignedUserEditForm');
    assignedUserEditForm.innerHTML = "";
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        assignedUserEditForm.innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>`;
    }
}