const database = firebase.firestore();
const formsCollection = database.collection('forms');
const selectFormsCollection = database.collection('select_form');

// var html = document.getElementById("header");
const uid = "fTtxyh7vTKbg28vP40N3GQ2gsoV2";

function auto_grow(element){
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}