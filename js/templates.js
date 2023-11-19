//////////////////////// Board and cards HTML templates //////////////////////////////////

/**
 * HTML temnplate for render functions
 * @param {number} i 
 * @returns html content
 */
function renderBoardTemplate(i) {
    return `<div class="cardBoard" draggable="true" id="card${i}" ondragstart="startDragging(${i})" onclick='openCard(${i})'>
    <div class="cardBoardInside">
        <div class="cardHeadMain">
        <div class="cardBoardInsideCategory"; id="cardBoardInsideCategory${i}">${cards[i]['category']}</div>
        <div class="svgImage"><div class="svgMinus90Degree" id="svgToLeft${i}" onclick="listTypeToLeft(${i})">${svgArrowLeft}</div><div class="svgPlus90Degree" id="svgToRight${i}" onclick="listTypeToRight(${i})">${svgArrowRight}</div></div>
        </div>
        <div class="cardBoardInsideTitleAndDescrption">
            <div class="cardBoardInsideTitle">${cards[i]['title']}</div>
            <div class="cardBoardInsideDescription">${cards[i]['description']}</div>
        </div>
        <div class="cardBoardInsideProgress" id="cardBoardInsideProgress${i}"><div class="progressBar"><div class="progress" id="progressBar${i}"></div></div>
        <div><p>${cards[i]['progress']}/${cards[i]['subtasks'].length} Done</p></div>
        </div>
        <div class="cardBoardInsideUserAndPrio">
        <div class="InsideUser" id="InsideUser${i}"></div><img src="assets/img/board/${cards[i]['prio']}.svg" alt="">
        </div>
    </div>
</div>`;
}

/**
 * Render the current prio state of card
 */
function renderPrioState(i) {
    return `
    <div class="addTaskPrios" id="prioButtons2">
        <button class="SubTaskPrios2 red" id="prioSelect0" onclick="addActiveState2(${i},0)">
        Urgent<img src="assets/img/addtask/prio-high.svg" alt="" class="default"><img src="assets/img/addtask/prio-high-w.svg" alt="" class="active"></button>
        <button class="SubTaskPrios2 yellow" id="prioSelect1" onclick="addActiveState2(${i},1)">
        Medium<img src="assets/img/addtask/prio-medium.svg" alt="" class="default"><img src="assets/img/addtask/prio-medium-w.svg" alt="" class="active"></button> 
        <button class="SubTaskPrios2 green" id="prioSelect2" onclick="addActiveState2(${i},2)">
        Low<img src="assets/img/addtask/prio-low.svg" alt="" class="default"><img src="assets/img/addtask/prio-low-w.svg" alt="" class="active"></button>
    </div>`;
}

/**
 * Render sub task mask
 */
function renderSubTaskMask(i) {
    return `
    <div class="subtask" id="subtask_main2">
        <h5>Subtasks</h5>
        <div id="addNewSubtask2" class="subtask-input">
            <p>Add new subtask</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
                <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <div id="subtasklist"></div>
        <div class="checkboxes" id="added_subtasks_main">
        </div>
    </div>`;
}

function editCardSubtaskTemplate(i){
    return `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

function editCardSubtaskTemplate2(addedSubtask, i, b){
    return `<div class="boxes" id="boxes${b}">• ${addedSubtask}<div class="actionlinks"><a href="#" 
    onclick="editLoadedSubtasks(${i},${b})" class="subTaskEdit"><img src="assets/img/board/edit-icon.svg"></a><a href="#" onclick="deleteEditedSubtasks(${i},${b})" 
    class="subTaskDel"><img src="assets/img/board/trash-icon.svg"></a></div></div>`;
}

function cancelSubtaskTemplate(i){
    return `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

function subtaskInputFormTemplate(i){
    return `
    <input type="text" placeholder="New subtask" id="added_subtask">
    <button class="close-category-input-btn" onclick="cancelSubtaskInput2()">${smallXSVG}</button>
    <svg height="40" width="3">
        <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" />
    </svg>
    <button class="add-category-btn" onclick="addSubtask2(${i})">${checkedSmallSVG}</button>
    `;
}

function subtaskDetailTemplate(b, i){
    return `<div class="boxes" id="boxes${b}">• ${cards[i]['subtasks'][b].nameSub}<div class="actionlinks"><a href="#" onclick="editLoadedSubtasks(${i},${b})" 
    class="subTaskEdit"><img src="assets/img/board/edit-icon.svg"></a><a href="#" 
    onclick="deleteEditedSubtasks(${i},${b})" class="subTaskDel"><img src="assets/img/board/trash-icon.svg"></a></div></div>`;
}

function editSubtaskTemplate(b, i){
    return `<input type="text" id='inputEditTask${b}'><div class="editactionlinks" style="display:none;" id="editsubtaskbtn">
    <a href="#" onclick="cancelEditedSubtask(${i},${b})" class="subdellink"><img src="assets/img/board/trash-icon.svg"></a><a href="#" 
    onclick="saveEditedSubtask(${i},${b})" class="subedilink"><img src="assets/img/board/check-icon.svg"></a></div>`;
}

function addUserTemplate(i){
    return `<input type="text" placeholder="Select Contacts to assign" id="inputassigneduser" onclick="openDropdownContact2(${i})" onkeyup="openDropdownSearch(${i})">`;
}

function assignedUserFormTemplate(i, p){
    return `
    <div class="addusertocard" onclick="addUser(${i}, ${p})" id="addusercard${p}">
    <div class="label-card" style="background-color:${nameTagsColors[p]}">${Contacts[p]['firstLetters']}</div>
    <div class="card-name" id="contactsname${i}${p}">${Contacts[p]['name']}</div>
    <img src="assets/img/board/checkbox-unchecked.svg" class="usercheckb default" id="userchecked${p}">
    <img src="assets/img/board/checkbox-checked.svg" class="usercheckb hover"></div>`;
}


function subtasksCardTemplate(i,j){
    return `
    <div id="SubTaskHead${j}" class="subtaskAndCheckbox"><input class="SubTaskCheckbox" id="SubTaskCheckbox${i}${j}" ${cards[i]['subtasks'][j]['status']} type="checkbox" 
    onclick="ChangeCheckboxSubtasks(${i},${j})"><div class="label-subtask">${cards[i]['subtasks'][j]['nameSub']}</div></div>
    `;
}
/** Adds assigned user to dropdown.
 * 
 */
function assigendUserToDropdown(i, p) {
    return `
        <div class="addusertocard" onclick="addUser(${i}, ${p})" id="addusercard${p}">
        <div class="label-card" style="background-color:${nameTagsColors[p]}">${Contacts[p]['firstLetters']}</div>
        <div class="card-name" id="contactsname${i}${p}">${Contacts[p]['name']}</div>
        <img src="assets/img/board/checkbox-unchecked.svg" class="usercheckb default" id="userchecked${p}">
        <img src="assets/img/board/checkbox-checked.svg" class="usercheckb hover"></div>`;
}

//////////////////////// Contacts HTML templates //////////////////////////////////

function newContactBtnTemplate() {
    return `<button class="new-contact" onclick="renderAddNewContact()">
    <p>New contact</p> 
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33"
        viewBox="0 0 32 33" fill="none">
        <mask id="mask0_72255_869" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
        y="0" width="32" height="33">
        <rect y="0.5" width="32" height="32" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_72255_869)">
        <path
            d="M25.3294 19.1667C25.0134 19.1667 24.7499 19.0602 24.5388 18.8473C24.3277 18.6343 24.2222 18.3704 24.2222 18.0556V14.9445H21.111C20.7962 14.9445 20.5323 14.8376 20.3194 14.6239C20.1064 14.4102 19.9999 14.1454 19.9999 13.8295C19.9999 13.5136 20.1064 13.2501 20.3194 13.0389C20.5323 12.8278 20.7962 12.7223 21.111 12.7223H24.2222V9.61115C24.2222 9.29635 24.329 9.03246 24.5427 8.81948C24.7564 8.60653 25.0212 8.50005 25.3372 8.50005C25.6531 8.50005 25.9166 8.60653 26.1277 8.81948C26.3388 9.03246 26.4444 9.29635 26.4444 9.61115V12.7223H29.5555C29.8703 12.7223 30.1342 12.8291 30.3472 13.0428C30.5601 13.2566 30.6666 13.5214 30.6666 13.8373C30.6666 14.1532 30.5601 14.4167 30.3472 14.6278C30.1342 14.8389 29.8703 14.9445 29.5555 14.9445H26.4444V18.0556C26.4444 18.3704 26.3375 18.6343 26.1238 18.8473C25.9101 19.0602 25.6453 19.1667 25.3294 19.1667ZM11.9999 16.4778C10.5333 16.4778 9.31473 15.9926 8.34435 15.0223C7.374 14.0519 6.88882 12.8334 6.88882 11.3667C6.88882 9.90005 7.374 8.68154 8.34435 7.71118C9.31473 6.7408 10.5333 6.25562 11.9999 6.25562C13.4666 6.25562 14.6851 6.7408 15.6555 7.71118C16.6258 8.68154 17.111 9.90005 17.111 11.3667C17.111 12.8334 16.6258 14.0519 15.6555 15.0223C14.6851 15.9926 13.4666 16.4778 11.9999 16.4778ZM2.44435 27.1667C2.12955 27.1667 1.86566 27.0602 1.65269 26.8473C1.43973 26.6343 1.33325 26.3704 1.33325 26.0556V23.8334C1.33325 23.063 1.5314 22.3612 1.92769 21.7279C2.324 21.0945 2.8666 20.6186 3.55549 20.3C5.12586 19.5815 6.58022 19.0649 7.91855 18.75C9.25691 18.4352 10.6162 18.2779 11.9963 18.2779C13.3765 18.2779 14.737 18.4352 16.0777 18.75C17.4184 19.0649 18.8666 19.5815 20.4222 20.3C21.111 20.6334 21.6573 21.113 22.061 21.7389C22.4647 22.3649 22.6666 23.063 22.6666 23.8334V26.0556C22.6666 26.3704 22.5601 26.6343 22.3472 26.8473C22.1342 27.0602 21.8703 27.1667 21.5555 27.1667H2.44435ZM3.55545 24.9445H20.4444V23.8334C20.4444 23.5149 20.3648 23.2149 20.2055 22.9334C20.0462 22.6519 19.8073 22.4408 19.4888 22.3C18.0518 21.5963 16.7629 21.1204 15.6222 20.8723C14.4814 20.6241 13.274 20.5 11.9999 20.5C10.7259 20.5 9.51844 20.6278 8.37769 20.8834C7.23695 21.1389 5.94066 21.6112 4.48882 22.3C4.19991 22.4408 3.97212 22.6519 3.80545 22.9334C3.63879 23.2149 3.55545 23.5149 3.55545 23.8334V24.9445ZM11.9999 14.2556C12.8221 14.2556 13.5092 13.9797 14.061 13.4278C14.6129 12.876 14.8888 12.1889 14.8888 11.3667C14.8888 10.5445 14.6129 9.85746 14.061 9.30562C13.5092 8.75375 12.8221 8.47782 11.9999 8.47782C11.1777 8.47782 10.4907 8.75375 9.93882 9.30562C9.38695 9.85746 9.11102 10.5445 9.11102 11.3667C9.11102 12.1889 9.38695 12.876 9.93882 13.4278C10.4907 13.9797 11.1777 14.2556 11.9999 14.2556Z"
            fill="white" /></g></svg>
    </button>`;
}

function editContactForm(x, firstTwoLetters) {
    return `<div class="new-contact-main new-contact-main-animate" onclick="doNotClose(event)" id="new_contact_main">
                                        <div class="frame-194">
                                            <div class="capa2">${capa2}</div>
                                            <div class="frame-210"><div class="cancel-contact" onclick="closeNewContact()">
                                            <img src="assets/img/contacts/close-w.svg"></div>
                                                <div class="frame-211">Edit contact</div>
                                                <div class="vector-5">${vector5}</div>
                                            </div>
                                        </div>

                                        <div class="frame-79">
                                            <div class="group-9">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                                            <circle cx="60" cy="60" r="60" fill="${nameTagsColors[x]}"/>
                                            </svg>
                                            <p>${firstTwoLetters}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="frame-215">
                                        <form  onsubmit="editContact(${x}); return false;">
                                            <div class="add-contact-text-main">
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="text" id="edit_name" required placeholder="Name">
                                                        ${personSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="email" id="edit_email" required placeholder="Email">
                                                        ${emailSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="tel" id="edit_phone" placeholder="Phone" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))">
                                                        ${phoneSmallSVG}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="add-contact-buttons-main">                                                
                                                    <div class="add-contact-cancel" onclick="deleteContactFromEdit(${x})">
                                                        <span>Delete</span> 
                                                    </div>
                                                    <button type="submit" class="add-contact-create"> 
                                                        <span> Save </span>
                                                        ${checkSmallSVG}
                                                    </button>
                                                
                                            </div>
                                            </form>
                                        </div>
    
                                    </div>`;
}

function addContactForm() {
    return `<div class="new-contact-main new-contact-main-animate" onclick="doNotClose(event)" id="new_contact_main">
                                        <div class="frame-194">
                                            <div class="capa2">${capa2}</div>
                                            <div class="frame-210"><div class="cancel-contact" onclick="closeNewContact()">
                                            <img src="assets/img/contacts/close-w.svg"></div>
                                                <div class="frame-211">Add contact</div>
                                                <div class="frame-212">Tasks are better with a team!</div>
                                                <div class="vector-5">${vector5}</div>
                                            </div>
                                        </div>

                                        <div class="frame-79">
                                            <div class="group-9">
                                                    ${group9SVG}
                                                <div class="person">${personSVG} </div>
                                            </div>
                                        </div>
                                        
                                        <div class="frame-215">
                                        <p id="messageExistingContact" style="display: none;">This contact already exists. Please use other e-mail address!</p>
                                        <form  onsubmit="createNewContact(); return false;">
                                            <div class="add-contact-text-main">
                                                <div id="name_Frame" class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="text" required id="add_contact_name" placeholder="Vor- und Nachname">
                                                        ${personSmallSVG}
                                                    </div>
                                                </div>
                                                <div id="name_Alert"></div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="email" required id="add_contact_email" placeholder="Email">
                                                        ${emailSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="tel" id="add_contact_phone" placeholder="Phone" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))">
                                                        ${phoneSmallSVG}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="add-contact-buttons-main">                                                
                                                    <div class="add-contact-cancel" onclick="closeNewContact()">
                                                        <span>Cancel</span> 
                                                        ${xSmallSVG}
                                                    </div>
                                                    <button type="submit" class="add-contact-create"> 
                                                        <span>Create contact</span>
                                                        ${checkSmallSVG}
                                                    </button>                 
                                            </div>
                                            </form>
                                        </div>
    
                                    </div>`;
}

function contactListTemplate(element, firstLetter, firstTwoLetters, contactsList, i) {
    return `   <div class="frame-112" id="letter_${firstLetter}">
    <p>${firstLetter}</p>
</div> 

<div class="frame-119">
    <svg xmlns="http://www.w3.org/2000/svg" width="354" height="2" viewBox="0 0 354 2" fill="none">
    <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
    </svg>
</div>
<div class="frame_112"> 

</div>
<div class="contact_name" id="contact_${[i]}" onclick="showContactDetails(${[i]})"> 
    <div class="frame_79">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
        <circle cx="21" cy="21" r="20.5" fill="${nameTagsColors[i]}" stroke="white"/>
        </svg>
        <p>${firstTwoLetters}</p>
    </div>
    <div type="button" class="frame_81">
        <span id="contact_name_${[i]}">
            ${element['firstName']} ${element['lastName']}
        </span>
        <a>${element['email']}</a>   
    </div>
</div>
`;
}

function contactIconTemplate(element, firstTwoLetters, contactsList, i) {
    return `
            <div class="frame_112"> 
                 
            </div>
            <div class="contact_name" id="contact_${[i]}" onclick="showContactDetails(${[i]})"> 
                <div class="frame_79">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <circle cx="21" cy="21" r="20.5" fill="${nameTagsColors[i]}" stroke="white"/>
                </svg>
                <p>${firstTwoLetters}</p>
            </div>
            <div class="frame_81">
                <span id="contact_name_${[i]}">
                    ${element['firstName']} ${element['lastName']}
                </span>
                
                <a>${element['email']}</a>   
            </div>
        </div>`;
}

function contactDetailTemplate(x, element, contactCardContainer, firstTwoLetters){
    return `<div class="frame-105">
        <div class="frame_99">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="60" fill="${nameTagsColors[x]}"/>
            </svg>
            <p>${firstTwoLetters}</p>
        </div>
        <div class="frame-104">
            <p class="frame-64">${element['firstName']} ${element['lastName']}</p>
            <div class="frame-204"> 
                <div class="edit-contact" onclick="renderEditContact(${x})"> ${editSVG} Edit </div>
                <div class="delete-contact" onclick="deleteContact(${x})"> ${deleteSVG} Delete </div>
            </div>   
        </div>   
    </div>
    <div class="frame-37"><span> Contact information </span></div>
    <div class="frame-101">
        <div class="frame-102"> 
            <span class="details-title">Email</span>
            <span class="details-email">${element['email']}</span>
        </div>
        <div class="frame-102"> 
            <span class="details-title">Phone</span>
            <span class="details-phone">+${element['phone']}</span>
        </div>  
    </div>
    <div class="onlymob">
    <a href="#" onclick="showContactEditMenu()" id="editcontact"><img src="assets/img/contacts/edit-contact.svg" class="default"><img src="assets/img/contacts/edit-contact-lightblue.svg" class="hover"></a>
      <div class="contact-edit" id="edit-contact" style="display:none;"> 
       <div class="edit-contact" onclick="renderEditContact(${x})"> ${editSVG} Edit </div>
       <div class="delete-contact" onclick="deleteContact(${x})"> ${deleteSVG} Delete </div>
      </div>
    </div>
        `;
}

//////////////////////// Login / SignUp HTML templates //////////////////////////////////

/**
 * Returns HTML code for a login form.
 * @returns {string} The HTML code for the login form.
 */
function returnLogInHTML() {
    return /* html */ `
        <form onsubmit="checkLogIn(); return false;" class="content">
            <div class="headingContainer">
                <h1>Log in</h1>
            </div>
            <div class="blueSeperator"></div>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div class="inputField">
                        <input required id="passwordInput" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div id="passwordAlert"></div>
                    <div class="rememberMeForgetBox mobilView">
                        <div class="checkBoxLogIn">
                            <div onclick="checkBox()" id="rememberMe" class="uncheckBox"></div>
                            <span>Remember me</span>
                        </div>
                        <a id="fmp" href="#" onclick="renderForgotPW()"> Forget my password</a>
                    </div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button type="onsubmit" class="logInButton">Log in</button>
                <button type="button" onclick="guestLogIn()" class="logInButton guestLogIn">Guest Log in</button>
            </div>
        </form>
    `;
}

/**
 * Returns HTML code for a sign-up form.
 * @returns {string} The HTML code for the sign-up form.
 */
function returnSignUpHTML() {
    return `
        <form onsubmit="signUpForm(); return false;" class="content responsivSignUp">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>Sign Up</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="nameInput" class="" type="text" placeholder="Vor- und Nachname">
                        <img src="./assets/img/logInSignUp/person.svg" alt="">
                    </div>
                    <div id="nameAlert"></div>
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div id="emailAlert"></div>
                    <div class="inputField">
                        <input required id="passwordInput" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div id="freeAlert"></div>
                    <div class="inputField">
                        <input required id="passwordInput2" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage2" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(2)">
                    </div>
                    <div id="passwordAlert"></div>
                    <div class="rememberMeForgetBox">
                        <div class="checkBoxSignIn">
                            <input type="checkbox" id="rememberMe" class="uncheckBox" required>
                            <span>I accept the </span>
                        </div>
                        <a id="fmp" href="#"> Privacy policy</a>
                    </div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="logInButton">Sign up</button>
            </div>
        </form>
    `;
}

/**
 * Returns HTML content for the 'Reset Password' form.
 * @returns {string} The HTML content.
 */
function returnResetPasswordHTML(i) {
    return /* html */ `
        <form onsubmit="setNewPassword('${i}'); return false;" class="content forgotPW">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>Reset your password</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <h2>Change your account password</h2>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="passwordInput" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div class="inputField">
                        <input required id="passwordInput2" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage2" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(2)">
                    </div>
                    <div id="passwordAlert"></div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="continueButton">Continue</button>
            </div>
        </form>
    `;
}

/**
 * Returns HTML content for the 'Forgot Password' form.
 * @returns {string} The HTML content.
 */
function returnForgotPWHTML() {
    return /* html */ `
        <form onsubmit="checkResetpassword(); return false;" class="content forgotPW">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>I forgot my password</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <h2>Don't worry! We will send you an email with the instructions to reset your password.</h2>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div id="emailAlert"></div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="sendEmailButton">Send me the email</button>
            </div>
        </form>
    `;
}

//////////////////////// Add task HTML templates //////////////////////////////////

function addTaskOverlayTemplate(){
    return `<div class="includeTaskForm" w3-include-html="templates/task_form2.html"></div>`;
}

function openDropdownTemplate(){
    return `<div class="category-selection" onclick="openCategoryInput()">Add category</div>`;
}

function categoryInputTemplate(){
    return `
    <h5>Category</h5>
    <div class="add-category-container">
       <input class="added-category-name" id="added_category_name" type="text" placeholder="New category name">
       <button class="close-category-input-btn" onclick="closeCategoryInput()">${smallXSVG}</button>
       <svg height="40" width="3"> <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" /> </svg>
       <button class="add-category-btn" onclick="addCategory()">${checkedSmallSVG}</button>
    </div>
    <div class="selectable-category-colors" id="selectable_category_colors"> </div>
    `;
}

function categoryDropdownTemplate(element){
    return`
    <h5>Category</h5>
    <div class="selectContainer" id="addCategory" onclick="openCategoryDropDown()">
        <div class="category-selection">${element['name']} 
            <svg class="new-category-color">
            <circle cx="12" cy="12" r="10" stroke="black" stroke-width="0" fill="${element['color']}" />
            </svg>
        </div>
    </div>`;
}

function closeCategoryTemplate(){
    return `<h5>Category</h5><div class="selectContainer addcatph" id="addCategory" onclick="openCategoryDropDown()">Select task category</div>`;
}

function categorySelectTemplate(element, i){
    return `<div class="category-selection" onclick="selectedCategory(${i})">${element['name']}<svg class="new-category-color">
        <circle cx="50%" cy="50%" r="12" stroke="black" stroke-width="0" fill="${element['color']}" /></svg> </div>`;
}

function categoryTemplate(){
    return `<h5>Category</h5>
    <div class="selectContainer addcatph" onclick="closeCategoryInput()"> Select task category</div>
        <div class="selectCategoryContainer" id="addCategory"> </div>`;
}

function selectColorTemplate(element){
    return `
    <div class="selected-category-color" id="${element}" onclick="selectedCategoryColor('${element}')"><svg class="new-category-color">
        <circle id="circle_${element}" cx="12" cy="12" r="10" stroke="black" stroke-width="0" fill="${element}" /></svg></div>`;
}

function selectContactTemplate(){
    return `<h5>Assigned to</h5><input type="text" class="selectContainer" placeholder="Select contacts to assign" onclick="closeDropdownContact()"> </input>
    <div class="contacts_list_add_task" id="addContact"></div>`;
}

function closeDropdownContactTemplate(){
    return `<h5>Assigned to</h5><input type="text" class="selectContainer" placeholder="Select contacts to assign" onclick="openDropdownContact()">
    </input>`;
}

function contactsNameTagsTemplate(){
    return `<div class="added-contacts-name-tags-main" id="added_contacts_name_tags_main"> </div>`;
}

function unselectedUserTemplate(j, element, firstTwoLetters){
    return `
    <div class="add-task-contact" id="addTaskContact_${j}" onclick="selectedContact(${j})">
        <div class="frame_212">
            <div class="frame_79">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 42 42" fill="none">
                <circle cx="50%" cy="50%" r="20" fill="${nameTagsColors[j]}" stroke="white" stroke-width="3px"/>
                </svg>
                <p>${firstTwoLetters}</p>
            </div>    
            <div class="add-task-contact-name">
                ${element['firstName']} ${element['lastName']} <span id="currentUserCheck${j}"></span>
            </div>
        </div>
        <div class="add-task-contact-checkbox"><input type="checkbox" id="checkBox_${j}" onclick="selectedContact(${j})"></div>
    </div>`;
}

function selectedUserTemplate(j, element, firstTwoLetters){
    return `
        <div class="add-task-contact col_2A3647" id="addTaskContact_${j}" onclick="selectedContact(${j})">
            <div class="frame_212">
                <div class="frame_79">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <circle cx="50%" cy="50%" r="20" fill="${nameTagsColors[j]}" stroke="white" stroke-width="3px"/>
                    </svg>
                    <p>${firstTwoLetters}</p>
                </div>    
                <div class="add-task-contact-name">
                    ${element['firstName']} ${element['lastName']} <span id="currentUserCheck${j}"></span>
                </div>
            </div>
            <div class="add-task-contact-checkbox"><input type="checkbox" id="checkBox_${j}" onclick="selectedContact(${j})" checked></div>
        </div>`;
}

function subTaskMaskTemplate(addedSubtaskNameInput, subtaskMain){
    return `<div class="boxes">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 18 17" fill="none">
        <rect x="1" y="0.5" width="16" height="16" rx="3"
            fill="url(#paint0_linear_71853_3184)" stroke="black" />
        <defs>
            <linearGradient id="paint0_linear_71853_3184" x1="9" y1="0.5" x2="9"
                y2="16.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F9F9F9" />
                <stop offset="1" stop-color="#F0F0F0" />
            </linearGradient>
        </defs>
    </svg>${addedSubtaskNameInput}
</div>`;
}

function subTaskInputTemplate(){
    return `
    <input type="text" placeholder="New subtask" id="added_subtask">
    <button class="close-category-input-btn" onclick="cancelSubtaskInput()">${smallXSVG}</button>
    <svg height="40" width="3">
        <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" />
    </svg>
    <button class="add-category-btn" onclick="addSubtask()">${checkedSmallSVG}</button>
    `;
}

function subTaskBlankTemplate(){
    return `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput()">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

function nameTagsTemplate(p, firstTwoLetters){
    return `
    <div class="added-contact-name-tag"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="60" fill="${nameTagsColors[p]}"/>
        </svg>
        <p>${firstTwoLetters}</p>
    </div>
    `;
}