const database = firebase.firestore();
const formsCollection = database.collection('forms');
var itemsLoad = []
//#region Load tất cả form
formsCollection.get()
    .then(snapshot => {
        snapshot.forEach(form => {
            
            itemsLoad = form.data()
            var html = document.getElementById("all_forms");
            html.insertAdjacentHTML("beforeend", ` 
            <div class="form">
                <a href="loadForm.html"><h2>${itemsLoad.title}</h2></a>
                <button id="title_Modify${form.id}" onclick="title_Modify(${form.id})"><span class="material-icons">create</span></button>
            </div>
            `)
        })
    })
    .catch(error => {console.error(error)})
//#endregion

//#region Sửa tiêu đề
function title_Modify(formID){
    formsCollection.doc(formID.toString()).update({
        title: "Mẫu 1"
    })
    .then(() => {console.log('Data Successfully Written')})
    .catch(error => {console.error(error)})
}
//#endregion