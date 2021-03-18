const sendForm = document.getElementById('sendForm');
const sendData = document.getElementById('sendData');

var loadAmount = []
var length = 0


selectFormsCollection.doc("0").get()
    .then(form => {
        if(form.exists){
            loadAmount = form.data()
            console.log("loadAmount", "=>",loadAmount.count)
            length = loadAmount.count
        }
        else
            console.log('form does not exist');
    })
    .catch(error => {console.error(error)})


sendForm.addEventListener('click', e => {
    e.preventDefault();
    formsCollection.doc(length.toString()).set({
        data : data,
        link : window.location.href,
        title : 'Mẫu không có tiêu đề',
    })
    .then(() => {console.log('Data Successfully Written');})
    .catch(error => {console.error(error)});
    // document.location='index.html';

    selectFormsCollection.doc("0").update({
        count: firebase.firestore.FieldValue.increment(1)
    })
})
