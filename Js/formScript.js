var data = []
var question_idTextarea = 0, answer_idTextarea = 0
var question_amount = {
    type0: 0,
    type1: 0,
    type2: 0,
    type3: 0,
}
//#region Khởi đầu
render_question0(question_amount.type0, question_amount.type0)
data.push({
    type: 0,
    title_id: question_amount.type0,
    title: '',
    description_id: question_amount.type0++,
    description: '',
})

// data.push({
//     type: 1,
//     question_id: type1,
//     question: '',
//     answer_id: type1++,
//     answer: '',
// })
// data.push({
//     type: 0,
//     title_id: type0,
//     title: '',
//     description_id: type0++,
//     description: '',
// })
// data.push({
//     type: 1,
//     question_id: type1,
//     question: '',
//     answer_id: type1++,
//     answer: '',
// })
//#endregion

//Loại lại danh sách câu hỏi sau khi xoá
function afterDelete() {
    var question_amount = {//Lưu id tương tự id của từng câu hỏi trên firebase
        type0: 0,
        type1: 0,
        type2: 0,
        type3: 0,
    }
    document.getElementById("question").outerHTML = `<div id="question">
    </div>`
    for (var key in data) {
        switch (data[key].type) {
            case 0:
                render_question0(question_amount.type0, question_amount.type0, data[key].title, data[key].description)
                data[key].title_id = question_amount.type0; data[key].description_id = question_amount.type0
                question_amount.type0++
                break
            case 1:
                render_question1(question_amount.type1, question_amount.type1, data[key].question)
                data[key].question_id = question_amount.type1; data[key].answer_id = question_amount.type1
                question_amount.type1++
                break
            case 2:
                render_question2(question_amount.type2)
                data[key].question_id = question_amount.type2; data[key].star_rating_id = question_amount.type2
                question_amount.type2++
                break
            case 3:
                // render_question1(data[key].question_id, data[key].answer_id, data[key].question)
                break
        }
    }
}
function render_question0(type0, type0) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", ` 

    <div class="type1" id="type1${type0}">

        <div class="row100">
            <div class="inputBx100" id="div1Question${type0}">
                <textarea class="title_textarea" id="title${type0}" placeholder="Tiêu đề biểu mẫu"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100" id="div1Description${type0}">
                <textarea class="description_textarea" id="description${type0}" placeholder="Mô tả biểu mẫu"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <a onclick="delete_question0(${type0})"><span class="material-icons">delete</span></a>

</div>`)
}

function render_question1(type1, type1) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", `
    <div class="type2" id="type2${type1}">

        <div class="row100">
            <div class="inputBx100" id="div1answer${type1}">
                <textarea class="title_textarea" id="1question${type1}" placeholder="Câu hỏi"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100">
                <textarea class="description_textarea" disabled = true id="1answer${type1}" placeholder="Văn bản trả lời"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <a onclick="delete_question1(${type1})"><span class="material-icons">delete</span></a>

</div>`);
}

function render_question2(type2) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", `
    <div class="type3" id="type3${type2}">
        <div class="row100">
            <div class="inputBx100" id="div2Question${type2}">
                <textarea class="title_textarea" id="2question${type2}" onkeypress="auto_grow(this);"
                    onkeyup="auto_grow(this);" placeholder="Tiêu đề biểu mẫu"></textarea>
            </div>
            <div id="star_rating${type2}">
            </div>
        </div>
        <a onclick="delete_question2(${type2})"><span class="material-icons">delete</span></a>
    </div>
`);
$(function () {
    var rating = new starRating({ // create first star rating system on page load
        containerId: 'star_rating' +  (question_amount.type2-1).toString(), // element id in the dom for this star rating system to use
        starWidth: 30, // width of stars
        starHeight: 30, // height of stars
        ratingPercent: '50%', // percentage star system should start 
        canRate: true, // can the user rate this star system?
        onRate: function () { // this function runs when a star is clicked on
            console.log(rating);
            // alert('You rated ' + rating.newRating + ' starts');
        }
    });
});
}

// lấy câu hỏi trên textarea vào data
function setQuestion00(index, question) {
    data[index].title = question
    console.log("title", "=>", question)

}
function setQuestion01(index, question) {
    data[index].description = question
    console.log("question", "=>", question)

}
function setQuestion1(index, answer) {
    data[index].question = answer
    console.log("answer", "=>", answer)
}
function setQuestion2(index, answer) {
    data[index].question = answer
    console.log("answer", "=>", answer)
}

// Thêm câu hỏi
function add0() {
    data.push({
        type: 0,
        title_id: question_amount.type0,
        title: '',
        description_id: question_amount.type0,
        description: '',
    })
    render_question0(question_amount.type0, question_amount.type0)
    question_amount.type0++;
    console.log("question_amount", "=>", question_amount)
    console.log(data)
}
function add1() {
    data.push({
        type: 1,
        question_id: question_amount.type1,
        question: '',
        answer_id: question_amount.type1,
        answer: [],
    })
    render_question1(question_amount.type1, question_amount.type1)
    question_amount.type1++;
    console.log("question_amount", "=>", question_amount)
    console.log(data)
}
function add2() {
    data.push({
        type: 2,
        question_id: question_amount.type2,
        question: '',
        star_rating_id: question_amount.type2,
        rating: [],
    })
    render_question2(question_amount.type2)
    question_amount.type2++;
    console.log("question_amount", "=>", question_amount)
    console.log(data)
}
// Xoá câu hỏi
function delete_question0(id_question) {
    var a = -1
    for (var i = 0; i < data.length; i++) {
        if (data[i].title_id == id_question && data[i].type == 0) {
            a = i;
            break;
        }
    }
    var myQuestion = document.getElementById("type1" + id_question.toString());
    if (a != -1) {
        myQuestion.remove()
        data.splice(a, 1);
        question_amount.type0--
        console.log("data0", "=>", data);
        afterDelete()
    }


}
function delete_question1(id_question) {
    var a = -1
    for (var i = 0; i < data.length; i++) {
        if (data[i].question_id == id_question && data[i].type == 1) {
            a = i;
            break;
        }
    }
    var myQuestion = document.getElementById("type2" + id_question.toString());
    if (a != -1) {
        myQuestion.remove()
        data.splice(a, 1);
        question_amount.type1--
        console.log("data1", "=>", data);
        afterDelete()
    }
}
function delete_question2(id_question) {
    var a = -1
    for (var i = 0; i < data.length; i++) {
        if (data[i].question_id == id_question && data[i].type == 2) {
            a = i;
            break;
        }
    }
    var myQuestion = document.getElementById("type3" + id_question.toString());
    if (a != -1) {
        myQuestion.remove()
        data.splice(a, 1);
        question_amount.type2--
        console.log("data1", "=>", data);
        afterDelete()
    }
}

document.getElementById('btn-add0').addEventListener('click', add0);
document.getElementById('btn-add1').addEventListener('click', add1);
document.getElementById('btn-add2').addEventListener('click', add2);

// create object

// document.getElementById('btn-add3').addEventListener('click', add3);
// console.log("data", "=>", data);
