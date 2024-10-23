let popupForm = document.querySelector('#popupForm');
let editButton = document.querySelector('.profile__info-edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let saveButton = document.querySelector('.popup__submit');
let nameInput = document.querySelector('#name-input');
let jobInput = document.querySelector('#job-input');
let profileName = document.querySelector('.profile__info-header');
let profileJob = document.querySelector('.profile__info-title');

function openPopup(popup) {
    popup.classList.add('popup_show');
    nameInput.value = profileName.textContent; 
    jobInput.value = profileJob.textContent;
}

function closePopup(popup) {
    popup.classList.remove('popup_show');
}

editButton.addEventListener('click', function () {
    openPopup(popupForm);
});

closeButton.addEventListener('click', function () {
    closePopup(popupForm);
});

popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value; 
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
    closePopup(popupForm);  
});
