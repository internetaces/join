let cards = [];

let categories = [];

let categoryColors = ['#FFC701', '#1FD7C1', '#0038FF', '#FF7A00', '#FF0000', '#E200BE'];

let listTypes = [{
    name: "ToDo",
    amount: 0,
},
{
    name: "InProgress",
    amount: 0,
},
{
    name: "Awaitingfeedback",
    amount: 0,
},
{
    name: "Done",
    amount: 0,
}
];

let currentListType = "";

let currentDraggedElement;

/**
 * Render all cards in board by loading from remote storage
 */
async function renderBoard() {
    await getCardsFromStorage();
    clearAllListTypesAmount();
    renderBoardCards();
    getCategoriesFromStorage();
}

/**
 * Render all ToDo cards in board
 */
async function renderBoardCards() {
    await getContactsFromStorage();
    await getCardsFromStorage();
    clearBoardCards();
    for (let i = 0; i < cards.length; i++) {
        if (cards[i]['listType'] == 'ToDo') {
            listTypes[0]['amount']++;
            document.getElementById('cardBoardToDo').innerHTML +=
                renderBoardTemplate(i);
            renderBoardFunctionsTemplate(i);
        } else {
            renderBoardCardsInProgress(i)
        };
    } renderNoCardsInCardBoard();
}

/**
 * Render all InProgress cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsInProgress(i) {
    if (cards[i]['listType'] == 'InProgress') {
        listTypes[1]['amount']++;
        document.getElementById('cardBoardInProgress').innerHTML +=
            renderBoardTemplate(i);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsAwaitingFeedback(i) };
}

/**
 * Render all AwaitingFeedback cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsAwaitingFeedback(i) {
    if (cards[i]['listType'] == 'Awaitingfeedback') {
        listTypes[2]['amount']++;
        document.getElementById('cardBoardAwaitingfeedback').innerHTML +=
            renderBoardTemplate(i);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsDone(i) };
}

/**
 * Render all Done cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsDone(i) {
    if (cards[i]['listType'] == 'Done') {
        listTypes[3]['amount']++;
        document.getElementById('cardBoardDone').innerHTML +=
            renderBoardTemplate(i);
    } else { }
    renderBoardFunctionsTemplate(i);
}

/**
 * collection of other functions which are needed when render cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardFunctionsTemplate(i) {
    renderProgressBar(i);
    renderAssignedUserInBoard(i);
    renderBackgroundColorCategory(i);
    renderListTypeArrows(i);
}

/**
 * assign the correct color of the card category by compare category of the card with category array
 * @param {number} i - index of the Cards array
 */
function renderBackgroundColorCategory(i) {
    let cat = cards[i]['category'];
    let catClass = document.getElementById(`cardBoardInsideCategory${i}`);
    for (let k = 0; k < categories.length; k++) {
        if (cat == categories[k]['name']) {
            catClass.style['background-color'] = categories[k]['color'];
        } else { }
    };
}

/**
 * render progressbar in card by update the bar according to amount of subtasks and checked subtasks
 * @param {number} i - index of the Cards array
 */
function renderProgressBar(i) {
    let progressValue = cards[i]['progress'] * 100 / cards[i]['subtasks'].length;
    let progressBar = document.getElementById(`progressBar${i}`);
    if (cards[i]['subtasks'].length == 0) {
        document.getElementById(`cardBoardInsideProgress${i}`).classList.add("d-none");
    } else {
        progressBar.style.width = progressValue + '%';
    }
}

/**
 * render assigned user icon with initials in card
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserInBoard(i) {
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        document.getElementById(`InsideUser${i}`).innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>
            `;
    }
}

/**
 * render assigned user full name in card detailed view
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserFullName(i) {
    const currentUserNumber = parseInt(currentUser);
    for (let j = 0; j < cards[i]['assignedUserFullName'].length; j++) {
        if (currentUser < Contacts.length) {
            if (cards[i]['assignedUserFullName'][j] == Contacts[currentUserNumber]['name']) {
                document.getElementById(`InsideUserFullName${i}`).innerHTML += `
            <div class="label-name">${cards[i]['assignedUserFullName'][j]} (You)</div>
            `;
            } else {
                document.getElementById(`InsideUserFullName${i}`).innerHTML += `
            <div class="label-name">${cards[i]['assignedUserFullName'][j]}</div>
            `;
            }
        } else {
            document.getElementById(`InsideUserFullName${i}`).innerHTML += `
        <div class="label-name">${cards[i]['assignedUserFullName'][j]}</div>`;
        }
    }
}

/**
 * render color of user icon according to assigned color in contacts array
 * @param {number} i - index of the Cards array
 * @param {number} j - index of assigned user in Cards JSON
 * @returns 
 */
function findUserColor(i, j) {
    for (let k = 0; k < Contacts.length; k++) {
        if (Contacts[k]['name'] == cards[i]['assignedUserFullName'][j]) {
            // return `${Contacts[k]['color']}`;
            return `${nameTagsColors[k]}`;
        } else { }
    }
}

/**
 * set list type 0 to clear value
 */
function clearAllListTypesAmount() {
    for (let k = 0; k < listTypes.length; k++) {
        listTypes[k]['amount'] = 0;
    }
}

/**
 * render 'no cards in board' placeholder for all columns
 */
function renderNoCardsInCardBoard() {
    for (let k = 0; k < listTypes.length; k++) {
        if (listTypes[k]['amount'] == 0) {
            document.getElementById(`cardBoard${listTypes[k]['name']}`).innerHTML += `
            <div class="NoCardsInBoardPlaceholder">No tasks in ${listTypes[k]['name']}</div>
            `;
        } else { }
    }
}

/**
 * clear all columns in board
 */
function clearBoardCards() {
    document.getElementById('cardBoardToDo').innerHTML = '';
    document.getElementById('cardBoardInProgress').innerHTML = '';
    document.getElementById('cardBoardAwaitingfeedback').innerHTML = '';
    document.getElementById('cardBoardDone').innerHTML = '';
}

/**
 * open addTask overlay in board
 */
function openAddTask(i) {
    const screenWidth = window.innerWidth;
    currentListType = `${i}`;
    if (screenWidth < 993) {
        document.getElementById('mobileAddTask').innerHTML = addTaskOverlayTemplate();
        main();
        includeTemplates();
    } else {
        document.getElementById('CardContainer').style = "display:block;";
        document.getElementById('overlay').classList.remove('d-none');
        main();
        // renderAddTask();
    }
}

/**
 * render addTask overlay by loading template
 */
function renderAddTask() {
    includeTemplates();
}

/**
 * close addTask overlay in board
 */
function closeOverlay() {
    let overlayClose = document.getElementById('overlay');
    overlayClose.classList.add('overlay-close');
    setTimeout(() => {
        document.getElementById('overlay').classList.add('d-none');
        overlayClose.classList.remove('overlay-close');
    }, 0);
    document.getElementById('CardContainer').style = "display:none;";
    document.getElementById('CardDetail').style = "display:none;";
    document.getElementById('CardEditForm').style = "display:none;";
    renderBoard();
    removeDropDownClass();
}

/**
 * stop other function when multiple functions called the same time
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * filter cards and show or hide depending on title and description
 */
function filterCards() {
    const query = document.getElementById("inputSearchBoard").value.toLowerCase();
    const cards = document.querySelectorAll(".cardBoard");
    cards.forEach((card) => {
        const title = card.querySelector(".cardBoardInsideTitle").innerHTML.toLowerCase();
        const description = card.querySelector(".cardBoardInsideDescription").innerHTML.toLowerCase();
        if (title.includes(query) || description.includes(query)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

/**
 * help function for addTask to transfer currentListType to add task in correct column
 * @param {string} currentListType - current list type to create card to correct board column
 */
function addTaskToBoardMain(currentListType) {
    if (currentListType == "") {
        currentListType = "ToDo";
    }
    addTaskToBoard(currentListType);
}

/**
 * render arrows to transfer cards to next or previous column
 * @param {number} i - index of the Cards array
 */
function renderListTypeArrows(i) {
    if (cards[i].listType == "ToDo") {
        document.getElementById(`svgToLeft${i}`).classList.add('d-none');
    } else {
        if (cards[i].listType == 'Done') {
            document.getElementById(`svgToRight${i}`).classList.add('d-none');
        }
    }
}

/**
 * change list type of card to previous type in board
 * @param {number} i - index of the Cards array
 */
async function listTypeToLeft(i) {
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            const nextListTypeIndex = (j - 1) % listTypes.length;
            cards[i].listType = listTypes[nextListTypeIndex].name;
            break;
        }
    }
    event.stopPropagation();
    await saveCardsToStorage();
    renderBoard();
}

/**
 * change list type of card to next type in board
 * @param {number} i - index of the Cards array 
 */
async function listTypeToRight(i) {
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            const nextListTypeIndex = (j + 1) % listTypes.length;
            cards[i].listType = listTypes[nextListTypeIndex].name;
            break;
        }
    }
    event.stopPropagation();
    await saveCardsToStorage();
    renderBoard();
}

/**
 * check and uncheck subtask checkbox of card
 */
async function ChangeCheckboxSubtasks(i, j) {
    if (cards[i]['subtasks'][j]['status'] == "checked") {
        cards[i]['subtasks'][j]['status'] = "unchecked";
        cards[i]['progress']--;
    } else {
        if (cards[i]['subtasks'][j]['status'] == "unchecked") {
            cards[i]['subtasks'][j]['status'] = "checked";
            cards[i]['progress']++;
        }
    }
    await saveCardsToStorage();
    renderBoard();
}

/**
 * delete card from board
 * @param {number} i - index of the Cards array 
 */
async function deleteCard(i) {
    cards.splice(i, 1);
    await saveCardsToStorage();
    closeOverlay();
}

/**
 * drag and drop function, start dragging element 
 * @param {number} i - index of the Cards array
 */
function startDragging(i) {
    currentDraggedElement = i;
    const cardElement = document.getElementById('card' + i);
    cardElement.classList.add('dragging'); // Füge die Klasse 'dragging' hinzu
}

/**
 * allow elements to drop in area with event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * set new list type for card after dropped in new column of board
 * @param {string} listType - name of list type
 */
async function moveTo(listType) {
    getCardsFromStorage();
    cards[currentDraggedElement]['listType'] = listType.slice(9);
    await saveCardsToStorage();
    renderBoard();
}