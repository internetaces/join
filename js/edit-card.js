/**
 * edit card function in card detailed view
 * @param {number} i - index of the Cards array
 */
function editCard(i) {
    document.getElementById('CardDetail').style = "display:none;";
    document.getElementById('CardEditForm').style = "display:block;";
    document.getElementById('editCardTitle').value = `${cards[i]['title']}`;
    document.getElementById('editCardDescription').value = `${cards[i]['description']}`;
    document.getElementById('editCardDueDate').value = `${cards[i]['dueDate']}`;
    document.getElementById('editCardPrio2').innerHTML = renderPrioState(i);
    document.getElementById('editCardSubtasks').innerHTML = renderSubTaskMask(i);
    let addUserInput = document.getElementById('selectbox');
    addUserInput.innerHTML = addUserTemplate(i);
    let editCardSave = document.getElementById('editCardSave');
    editCardSave.innerHTML = `<div onclick='saveEditedCard(${[i]})'>Ok`;
    loadActiveStatePrio(i);
    loadSubtasksEditform(i);
    loadAssignedUserEditForm(i);
}

/**
 * load form to edit subtasks in detailed view of card
 * @param {number} i - index of the Cards array
 */
function loadSubtasksEditform(i) {
    let subtaskMain = document.getElementById('subtasklist');
    subtaskMain.innerHTML = '';
    for (b = 0; b < cards[i]['subtasks'].length; b++) {
        subtaskMain.innerHTML += subtaskDetailTemplate(b, i);
    }
}

/**
 * edit subtasks in form 
 * @param {number} i - index of the Cards array
 * @param {number*} b - index of subtask in Cards JSON
 */
function editLoadedSubtasks(i, b) {
    let editSubtaskInput = document.getElementById(`subtasklist`);
    editSubtaskInput.innerHTML = editSubtaskTemplate(b, i);
    document.getElementById('editsubtaskbtn').style.display = "flex";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    editSubtaskInputValue.value = `${cards[i]['subtasks'][b].nameSub}`;
}

/**
 * save edited subtasks to card
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function saveEditedSubtask(i, b) {
    document.getElementById('editsubtaskbtn').style.display = "none";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    cards[i]['subtasks'][b].nameSub = editSubtaskInputValue.value;
    loadSubtasksEditform(i);
}

/**
 * open subtask input form
 * @param {number} i - index of subtask in Cards JSON
 */
function openSubtaskInput2(i) {
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML += subtaskInputFormTemplate(i);
}

/**
 * cancel edit subtask
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function cancelEditedSubtask(i, b) {
    loadSubtasksEditform(i);
}

/**
 * cancel edit subtask form
 */
function cancelSubtaskInput2() {
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    addSubtaskContainer.innerHTML = cancelSubtaskTemplate(i);
}

/**
 * add new subtask to card in edit card view
 * @param {number} i - index of the Cards array
 */
function addSubtask2(i) {
    let subtaskMain = document.getElementById('subtasklist');
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    let addedSubtask = document.getElementById('added_subtask').value;
    addSubtaskContainer.innerHTML = editCardSubtaskTemplate(i);
    subtaskMain.innerHTML += editCardSubtaskTemplate2(addedSubtask, i, b);
    cards[i]['subtasks'].push({ nameSub: addedSubtask, status: "unchecked" });
    addedSubtasks.push(addedSubtask);
    window.subtasks = addedSubtasks;
}

/**
 * delete subtask in edit view
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function deleteEditedSubtasks(i, b) {
    cards[i]['subtasks'].splice(b, 1);
    loadSubtasksEditform(i);
}

/**
 * load current priority state
 * @param {number} i - index of the Cards array
 */
function loadActiveStatePrio(i) {
    let currentPrioSelection = cards[i]['prio'];
    if (currentPrioSelection == "Urgent") {
        let prioSelect0 = document.getElementById('prioSelect0');
        prioSelect0.classList.add('active-state');
    } else
        if (currentPrioSelection == "Mid" || currentPrioSelection == "Medium") {
            let prioSelect1 = document.getElementById('prioSelect1');
            prioSelect1.classList.add('active-state');
        } else
            if (currentPrioSelection == "Low") {
                let prioSelect2 = document.getElementById('prioSelect2');
                prioSelect2.classList.add('active-state');
            }
}

/**
 * remove or add prio state
 * @param {number} i - index of the Cards array
 * @param {number} j - index of priority number
 */
function addActiveState2(i, j) {
    let btnsTip = document.getElementById('prioButtons2').getElementsByClassName('SubTaskPrios2');
    if (btnsTip[j].classList.contains('active-state')) {
        btnsTip[j].classList.remove('active-state');
    }
    else {
        for (f = 0; f < btnsTip.length; f++) {
            btnsTip[f].classList.remove('active-state');
        };
        btnsTip[j].classList.add('active-state');
    }
    let priorityNumber = j;
    window.priority = priorityNumber;
    prioValueForSaving(i, j);
}

let prioValue;
/**
 * set prio depending on value 
 * @param {*} i - index of the Cards array
 * @param {*} h - priority number value
 */
function prioValueForSaving(i, h) {
    if (h == 0) {
        prioValue = "Urgent";
    } else
        if (h == 1) {
            prioValue = "Mid";
        } else
            if (h == 2) {
                prioValue = "Low";
            }
    cards[i]['prio'] = prioValue;
}

/**
 * save edited card to board
 * @param {number} i - index of the Cards array 
 */
async function saveEditedCard(i) {
    cards[i]['title'] = document.getElementById('editCardTitle').value;
    cards[i]['description'] = document.getElementById('editCardDescription').value;
    cards[i]['dueDate'] = document.getElementById('editCardDueDate').value;

    //cards[i]['assignedUser'] = document.getElementById('editCardAssignedTo').value;
    cards.push();
    await saveCardsToStorage();
    openCard(i);
    document.getElementById('CardEditForm').style = "display:none;";
}