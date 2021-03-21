const database = firebase.firestore();
const formsCollection = database.collection('forms');
const selectFormsCollection = database.collection('select_form');

var html = document.getElementById("header");

var formId_index
function getFormID(getFormID) {
    formId_index = getFormID
    console.log(getFormID)
    // document.location='loadForm.html';
}