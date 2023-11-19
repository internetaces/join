/////////////////////// Function to initialize the page ///////////////////////////////////

/**
 * Initializes the application by starting the animation and retrieving contacts from storage.
 */
function init() {
    startAnimation();
    getContactsFromStorage();
}

//////////////////////// Function to start the animation //////////////////////////////////

/**
 * Initiates the animation sequence. Changes the logo source for small screens,
 * fades out the start background, and removes it from the DOM after the animation.
 */
function startAnimation() {
    if (window.innerWidth < 510) {
        logo.src = "img/joinlogomobil.png";
    }
    setTimeout(() => {
        let logo = document.getElementById("logo");
        let background = document.getElementById('startBackground');
        setTimeout(() => { logo.src = "img/joinlogo.png"; }, 80)
        logo.classList.add('imgLogo');
        background.style.backgroundColor = "rgba(246, 247, 248, 0%)";
        setTimeout(() => {
            if (background && background.parentNode) {
                background.parentNode.removeChild(background);
            }
        }, 500); // Wait for 0.5 seconds (same duration as the animation) before removing the image
        handleMaxWidthChange();
    }, 500); // Wait for 0.5 seconds before starting the animation
}

//////////////////////////////////// Function to toggle password visibility ////////////////////////////////

/**
 * Toggles the visibility of the password input field based on the provided index.
 * 
 * @param {number} i - The index to identify which password input field to toggle (1 or 2).
 */
function togglePasswordVisibility(i) {
    let passwordInput = document.getElementById('passwordInput');
    let passwordImage = document.getElementById('passwordImage');
    let passwordInput2 = document.getElementById('passwordInput2');
    let passwordImage2 = document.getElementById('passwordImage2');
    if (passwordInput && i === 1) {
        checkPasswordInput1(passwordInput, passwordImage);
    }
    if (passwordInput2 && i === 2) {
        checkPasswordInput2(passwordInput2, passwordImage2);
    }
}

function checkPasswordInput1(passwordInput, passwordImage) {
    if (passwordImage.src.includes('/assets/img/logInSignUp/lock.svg')) return;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Show password
        passwordImage.src = './assets/img/logInSignUp/eye.svg';
    } else {
        passwordInput.type = 'password'; // Hide password
        passwordImage.src = './assets/img/logInSignUp/hiddeneye.svg';
    }
}

function checkPasswordInput2(passwordInput2, passwordImage2) {
    if (passwordImage2.src.includes('/assets/img/logInSignUp/lock.svg')) return;
    if (passwordInput2.type === 'password') {
        passwordInput2.type = 'text'; // Show password
        passwordImage2.src = './assets/img/logInSignUp/eye.svg';
    } else {
        passwordInput2.type = 'password'; // Hide password
        passwordImage2.src = './assets/img/logInSignUp/hiddeneye.svg';
    }
}

/////////////////////////////////// Function to add event listeners for the password field ////////////////////////

/**
 * Sets up event listeners for password input fields.
 * @function
 * @returns {void}
 */
function setupPasswordInputEventListeners() {
    const passwordInputs = document.querySelectorAll('.passwordInput');
    updatePasswordImageSrc(passwordInput, passwordImage);
    passwordInputs.forEach((passwordInput) => {
        const passwordImage = passwordInput.nextElementSibling;
        passwordInput.addEventListener('focus', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });
        passwordInput.addEventListener('input', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });
        passwordInput.addEventListener('focusout', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });
    });
}

/**
    * Updates the password image source based on input and focus.
    * @param {HTMLInputElement} passwordInput - The password input field.
    * @param {HTMLImageElement} passwordImage - The associated password image.
    * @returns {void}
    */
function updatePasswordImageSrc(passwordInput, passwordImage) {
    if (passwordInput.value.trim().length > 0 && passwordInput.type === 'password' || 'text') {
        passwordImage.src = './assets/img/logInSignUp/hiddeneye.svg';
    } else {
        passwordImage.src = './assets/img/logInSignUp/lock.svg';
    }
}

////////////////////// Function to add event listeners after the DOM has loaded ////////////////////////
function setupEventListenersAfterDOMLoaded() {
    setupPasswordInputEventListeners();
}

///////////////////// Function called when the "Remember Me" button is clicked /////////////////////////

/**
 * Function called when the "Remember Me" button is clicked
 */
function checkBox() {
    let rememberMeImg = document.getElementById('rememberMe');
    if (rememberMeImg.classList.contains('checkBox')) {
        localStorage.setItem('rememberMe', 0);
    }
    if (rememberMeImg.classList.contains('uncheckBox')) {
        rememberMeImg.classList.remove('uncheckBox');
        rememberMeImg.classList.add('checkBox');
    } else {
        rememberMeImg.classList.add('uncheckBox');
        rememberMeImg.classList.remove('checkBox');
    }
}

async function checkRememberMe() {
    await getContactsFromStorage()
    let rememberMeCheckBox = document.getElementById('rememberMe');
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');
    if (rememberMe === 1 && currentUser !== 1000) {
        rememberMeCheckBox.click();
        emailInput.value = Contacts[currentUser].email;
        passwordInput.value = Contacts[currentUser].password;
    }
}

/////////////////////////////////////////// Log In //////////////////////////////////////////////////

/**
 * Function to render the LogIn form
 */
function renderLogIn() {
    let contentbox = document.getElementById('contentbox');
    contentbox.innerHTML = returnLogInHTML();
    setupEventListenersAfterDOMLoaded();
    checkRememberMe();
    document.getElementById('headerRight').classList.remove('d-none');
    document.getElementById('footer').classList.remove('d-none');
}

/////////////////////////////////////////// Sign Up //////////////////////////////////////////////////

/**
 * Function to render the SignUp form
 */
function renderSignUp() {
    let contentbox = document.getElementById('contentbox');
    contentbox.innerHTML = returnSignUpHTML();
    setupEventListenersAfterDOMLoaded();
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('banner').innerHTML = 'You Signed Up succeccfully';
}

/**
 * Function to handle SignUp form submission
 */
async function signUpForm() {
    let nameInput = document.getElementById('nameInput');
    let emailInput = document.getElementById('emailInput');
    let password1 = document.getElementById('passwordInput');
    let password2 = document.getElementById('passwordInput2');
    if (checkSamePasswort(password1, password2) && await checkEmail(emailInput.value) && checkTwoWordsforSignUp(nameInput)) {
        let nameArray = nameInput.value.split(' ');
        let firstName = nameArray[0];
        let lastName = nameArray[1];
        let firstTwoLetters = firstName.charAt(0) + lastName.charAt(0);
        let user = userInputJson(firstName, lastName, emailInput, firstTwoLetters, nameInput, password1);
        Contacts.push(user);
        showBanner();
        sortContactsAlphabetically(Contacts);
        await saveContactsToStorage();
        resetInputField(nameInput, emailInput, password1, password2);
        show();
        setTimeout(() => { renderLogIn() }, 2000);
        setTimeout(() => { hideBanner() }, 1000);
    }
}

function showBanner(){
    let banner = document.getElementById('banner');
    banner.style.display = "flex";
}

function hideBanner(){
    let banner = document.getElementById('banner');
    banner.style.display = "none";
}

function userInputJson(firstName, lastName, emailInput, firstTwoLetters, nameInput, password1) {
    return {
        "firstName": firstName,
        "lastName": lastName,
        "phone": 'Please add a phonenumber',
        "email": emailInput.value,
        "color": "black",
        "firstLetters": firstTwoLetters,
        "name": nameInput.value,
        "password": password1.value,
    };
}

/**
 * Resets the input fields by setting their values to an empty string.
 * @param {HTMLInputElement} name - The input field for the name.
 * @param {HTMLInputElement} email - The input field for the email.
 * @param {HTMLInputElement} password1 - The first password input field.
 * @param {HTMLInputElement} password2 - The second password input field.
 */
function resetInputField(name, email, password1, password2) {
    name.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';
}

/**
 * Check if the input field contains 2 words
 * @param {string} nameInput 
 * @returns {boolean}
 */
function checkTwoWordsforSignUp(nameInput) {
    let words = nameInput.value.trim().split(' ');
    if (words.length !== 2) {
        nameAlert.textContent = "Bitte Vor- und Nachname eingeben";
        nameInput.parentElement.classList.add('redInput');
        setTimeout(() => { nameAlert.textContent = ""; nameInput.parentElement.classList.remove('redInput'); }, 3000)
        return false;
    } else {
        return true;
    }
}

/**
 * Checks if an email already exists in the Contacts list.
 * @param {string} email - The email to check.
 * @returns {boolean} - Returns true if the email is not found, otherwise false.
 */
async function checkEmail(email) { // check if an email exists
    await getContactsFromStorage();
    for (let i = 0; i < Contacts.length; i++) {
        let userEmail = Contacts[i].email;
        if (email === userEmail) {
            emailAlert.textContent = "E-Mail bereits vorhanden";
            emailInput.parentElement.classList.add('redInput');
            setTimeout(() => { emailAlert.textContent = ""; emailInput.parentElement.classList.remove('redInput'); }, 3000)
            return false;
        }
    }
    return true;
}

/**
 * Checks if two password inputs have the same value.
 * @param {HTMLInputElement} password1 - The first password input element.
 * @param {HTMLInputElement} password2 - The second password input element.
 * @returns {boolean} Returns true if the passwords match, otherwise false.
 */
function checkSamePasswort(password1, password2) {
    if (password1.value !== password2.value) {
        passwordAlert.textContent = "Die Passwörter stimmen nicht überein!";
        password2.parentElement.classList.add('redInput');
        setTimeout(() => {
            passwordAlert.textContent = "";
            password2.parentElement.classList.remove('redInput');
        }, 3000);
    } else {
        return true;
    }
}

/////////////////////////////////////////// Forgot Password //////////////////////////////////////////////////

/**
 * Function to render the Forgot Password form
 */
function renderForgotPW() {
    let contentbox = document.getElementById('contentbox');
    contentbox.innerHTML = returnForgotPWHTML();
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('banner').innerHTML = '<img style="width: 32px" src="../assets/img/logInSignUp/sendCheck.svg">An E-Mail has been sent to you';
}

/**
 * Function to check which user Password to reset
 */
function checkResetpassword() {
    let emailInput = document.getElementById('emailInput');
    let emailFound = false;
    for (let i = 0; i < Contacts.length; i++) {
        let userEmail = Contacts[i].email;
        if (emailInput.value === userEmail) {
            show();
            emailFound = true;
            setTimeout(() => { renderResetPassword(i) }, 2000);
            break;
        }
    } if (!emailFound) {
        emailAlert.textContent = "E-Mail nicht vorhanden";
        emailInput.parentElement.classList.add('redInput');
        setTimeout(() => { emailAlert.textContent = ""; emailInput.parentElement.classList.remove('redInput'); }, 3000);
    }
}

/**
 * Renders the reset password page for a given user.
 * @param {number} i - The user index.
 */
function renderResetPassword(i) {
    let contentbox = document.getElementById('contentbox');
    contentbox.innerHTML = returnResetPasswordHTML(i);
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('banner').innerHTML = 'You reset your password';
    setupPasswordInputEventListeners();
}

/**
 * Sets a new password for the user at index i.
 * @param {number} i - The index of the user.
 */
async function setNewPassword(i) {
    let user = Contacts[i];
    let password1 = document.getElementById('passwordInput');
    let password2 = document.getElementById('passwordInput2');

    if (checkSamePasswort(password1, password2)) {
        user.password = password1.value;
        show();
        await saveContactsToStorage();
        setTimeout(() => { renderLogIn() }, 2000);
    }
}

/**
 * Displays a banner for a short duration.
 */
function show() {
    let banner = document.getElementById('banner');

    banner.classList.add("visible");
    setTimeout(() => {
        banner.classList.remove("visible");
    }, 2000)
}

/** 
 * Event listener that calls init() when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', handleMaxWidthChange);

/////////////////////////////////////// moveElementbyMedia max-width 510px for SignUp Button ///////////////////////////

/**
 * Moves the element with ID 'headerRight' to a new parent element.
 * @param {HTMLElement} newParent - The new parent element.
 */
function moveElementToNewPosition(newParent) {
    let elementToMove = document.getElementById('headerRight');
    let footerElement = document.getElementById('footer');

    if (elementToMove && newParent && footerElement) {
        newParent.insertAdjacentElement('beforebegin', elementToMove);
    }
}

/**
 * Handles the change in maximum width of the window.
 * If the window width is less than 510, moves the element with ID 'headerRight' before the footer.
 * If the window width is 510 or more, moves the element with ID 'headerRight' back to the header.
 */
function handleMaxWidthChange() {
    let moveBack = document.getElementById('header');
    let elementToMove = document.getElementById('headerRight');

    if (window.innerWidth < 510) {
        moveElementToNewPosition(document.getElementById('footer'));
    } else {
        if (moveBack && elementToMove)
            // moveElementToNewPosition(document.getElementById('front-main-content'));
            moveBack.appendChild(elementToMove);
    }
}

window.addEventListener('resize', handleMaxWidthChange);