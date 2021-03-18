const sendForm = document.getElementById('sendForm');
const database = firebase.firestore();
const formsCollection = database.collection('forms');

sendForm.addEventListener('click', e => {
    e.preventDefault();
    formsCollection.doc("0").set({
        data : data,
        link : window.location.href
    })
    .then(() => {console.log('Data Successfully Written');})
    .catch(error => {console.error(error)});
})
