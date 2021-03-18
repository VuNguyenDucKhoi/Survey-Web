
var itemsLoad = []
//#region Load tất cả form
formsCollection.get()
    .then(snapshot => {
        snapshot.forEach(form => {
            itemsLoad = form.data()
            var html = document.getElementById("all_forms");
            html.insertAdjacentHTML("beforeend", ` 
            <div class="form">
                <a href="#" onclick="select_form(${form.id})" ><h2>${itemsLoad.title}</h2></a>
                <button id="title_Modify${form.id}" onclick="title_Modify(${form.id})"><span class="material-icons">create</span></button>
                <button onclick="delete_form(${form.id})"><span class="material-icons">delete</span></button>
                </div>
            `)
        })
    })
    .catch(error => {console.error(error)})
//#endregion

// Sửa tiêu đề
function title_Modify(formID){
    formsCollection.doc(formID.toString()).update({
        title: "Mẫu 1"
    })
    .then(() => {console.log('Data Successfully Written')})
    .catch(error => {console.error(error)})
}

// Lưu id form đc chọn
function select_form(formID){
    selectFormsCollection.doc("0").update({
        id: formID.toString()
    })
    .then(() => {console.log('Data Successfully Written');document.location='loadForm.html';})
    .catch(error => {console.error(error)})
    
}

// Xoá một form
function delete_form(formID){
    formsCollection.doc(formID.toString()).delete()
    .then(() => {console.log('Data Successfully Written');document.location='index.html';})
    .catch(error => {console.error(error)})
    selectFormsCollection.doc("0").update({
        count: firebase.firestore.FieldValue.reduce(-1)
    })
}
