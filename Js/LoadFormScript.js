
const sendData = document.getElementById('sendData');
var loadData = []

var loadAmount = []
var formId = 0

selectFormsCollection.doc("0").get()
    .then(form => {
        if (form.exists) {
            loadAmount = form.data()
            console.log("loadAmount", "=>", loadAmount.id)
            formId = loadAmount.id
            formsCollection.doc(formId.toString()).get()
                .then(form => {
                    if (form.exists) {
                        loadData = form.data()
                        console.log("Loaddata", "=>", loadData.data)
                        myFunction()
                    }
                    else
                        console.log('form does not exist');
                })
                .catch(error => { console.error(error) })
        }
        else
            console.log('form does not exist');
    })
    .catch(error => { console.error(error) })

//#region test
function myFunction() {
    for (var key in loadData.data) {
        switch (loadData.data[key].type) {
            case 0:
                render_question0(loadData.data[key].title_idTextarea, loadData.data[key].description_idTextarea)
                break
            case 1:
                render_question1(loadData.data[key].question_idTextarea, loadData.data[key].answer_idTextarea)
                break
        }
    }
}
function render_question0(title_idTextarea, description_idTextarea) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", ` 
    <div class="type1">
    <form>
        <div class="row100">
            <div class="inputBx100">
                <textarea class="title_textarea" id="title${title_idTextarea}" placeholder="Tiêu đề biểu mẫu"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100">
                <textarea class="description_textarea" id="description${description_idTextarea}" placeholder="Mô tả biểu mẫu"></textarea>
            </div>
        </div>
    </form>
</div>`)
}
function render_question1(question_idTextarea, answer_idTextarea) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", `<div class="type2">
    <form>
        <div class="row100">
            <div class="inputBx100">
                <textarea id="1question${question_idTextarea}" placeholder="Câu hỏi"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100">
                <textarea id="1answer${answer_idTextarea}" placeholder="Văn bản trả lời"></textarea>
            </div>
        </div>
    </form>
</div>`);
}

document.getElementById('btn-add0').addEventListener('click', myFunction);
document.getElementById('btn-add1').addEventListener('click', myFunction);

