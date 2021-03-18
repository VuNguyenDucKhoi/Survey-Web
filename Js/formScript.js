var data = []
var title_idTextarea = 0, description_idTextarea = 0
var question_idTextarea = 0, answer_idTextarea = 0

//#region Khởi đầu
render_question0(title_idTextarea, description_idTextarea)
data.push({
    type: 0,
    title_id: title_idTextarea++,
    title: '',
    description_id: description_idTextarea++,
    description: '',
})
// data.push({
//     type: 1,
//     question_id: question_idTextarea,
//     question: '',
//     answer_id: answer_idTextarea,
//     answer: '',
// })
// data.push({
//     type: 0,
//     title_id: title_idTextarea++,
//     title: '',
//     description_id: description_idTextarea++,
//     description: '',
// })
// data.push({
//     type: 1,
//     question_id: question_idTextarea,
//     question: '',
//     answer_id: answer_idTextarea,
//     answer: '',
// })
console.log(data)

//#endregion

//#region test
function myFunction(){
    for (var key in data){
        switch(data[key].type){
            case 0:
                render_question0(data[key].title_idTextarea, data[key].description_idTextarea)
                break
            case 1:
                render_question1(data[key].question_idTextarea, data[key].answer_idTextarea)
                break
        }
    }
}

function render_question0(title_idTextarea, description_idTextarea) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend",` 
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


function add0() {
    data.push({
        type: 0,
        title_id: title_idTextarea,
        title: '',
        description_id: description_idTextarea,
        description: '',
    })
    console.log(data)
    render_question0(title_idTextarea, description_idTextarea)
    title_idTextarea++
    description_idTextarea++

}

function add1() {
    data.push({
        type: 1,
        question_id: question_idTextarea,
        question: '',
        answer_id: answer_idTextarea,
        answer: '',
    })
    console.log(data)
    render_question1(question_idTextarea, answer_idTextarea)
    question_idTextarea++
    answer_idTextarea++

}

document.getElementById('btn-add0').addEventListener('click', add0);
document.getElementById('btn-add1').addEventListener('click', add1);

