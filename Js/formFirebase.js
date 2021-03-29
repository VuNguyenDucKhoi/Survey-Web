const sendForm = document.getElementById('sendForm');
const sendData = document.getElementById('sendData');
var loadAmount = []
var length = 0
var data_value = []
//Lấy count trên firebase để tạo id cho form mới
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

//Tạo form mới
// sendForm.addEventListener('click', e => {
//     e.preventDefault();
//     formsCollection.doc(length.toString()).set({
//         data : data,
//         link : window.location.href,
//         title : 'Mẫu không có tiêu đề',
//     })
//     .then(() => {console.log('Data Successfully Written');document.location='index.html';})
//     .catch(error => {console.error(error)});
    

//     //Tăng count lên 1 để lưu id cho form mới sau này
//     selectFormsCollection.doc("0").update({
//         count: firebase.firestore.FieldValue.increment(1)
//     })
// })

sendForm.addEventListener('click', e => {
    e.preventDefault();
    formsCollection.doc(uid).collection("lists").doc(length.toString()).set({
        data : data,
        link : window.location.href,
        title : 'Mẫu không có tiêu đề',
        question_amount: question_amount,
    })
    .then(() => {console.log('Data Successfully Written');document.location='index.html';})
    .catch(error => {console.error(error)});
    

    //Tăng count lên 1 để lưu id cho form mới sau này
    selectFormsCollection.doc("0").update({
        count: firebase.firestore.FieldValue.increment(1)
    })
})
