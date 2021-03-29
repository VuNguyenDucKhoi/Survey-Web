const database = firebase.firestore();
const formsCollection = database.collection('forms');
const selectFormsCollection = database.collection('select_form');

var html = document.getElementById("header");
const uid = "fTtxyh7vTKbg28vP40N3GQ2gsoV2";

var formId_index
function getFormID(getFormID) {
    formId_index = getFormID
    console.log(getFormID)
    // document.location='loadForm.html';
}