const sendForm = document.getElementById('sendForm');
const getLink = document.getElementById('getLink');
const printForm = document.getElementById('printForm');
var loadData = []

var loadAmount = 0 //Lấy id của form đc chọn
var formId
var data = []
var question_amount = {
    type0: 0,
    type1: 0,
    type2: 0,
    type3: 0,
}
selectFormsCollection.doc("0").get()
    .then(form => {
        if (form.exists) {
            loadAmount = form.data()
            formId = loadAmount.id
            formsCollection.doc(uid).collection("lists").doc(formId).get()
                .then(form => {
                    if (form.exists) {
                        loadData = form.data()
                        // this.data = loadData.data
                        // editData(0, "hello")
                        render_title(loadData.title)
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

//push data từ firebase về để xử lý sau này
function getData0(id) {
    // selectFormsCollection.doc("0").get()
    //     .then(form => {
    //         if (form.exists) {
    //             loadAmount = form.data()
    //             formId = loadAmount.id
    //             formsCollection.doc(uid).collection("lists").doc(formId).get()
    //                 .then(form => {
    //                     if (form.exists) {
    //                         loadData = form.data()
    data.push({
        type: loadData.data[id].type,
        title_id: loadData.data[id].title_id,
        title: loadData.data[id].title,
        description_id: loadData.data[id].description_id,
        description: loadData.data[id].description,
    })
    question_amount.type0++
    //                 }
    //                 else
    //                     console.log('form does not exist');
    //             })
    //             .catch(error => { console.error(error) })
    //     }
    //     else
    //         console.log('form does not exist');
    // })
    // .catch(error => { console.error(error) })
    // console.log("data", "=>", data)
}

function getData1(id) {

    data.push({
        type: loadData.data[id].type,
        question_id: loadData.data[id].question_id,
        question: loadData.data[id].question,
        answer_id: loadData.data[id].answer_id,
        answer: loadData.data[id].answer,
    })
    question_amount.type1++


}
function getData2(id) {

    data.push({
        type: loadData.data[id].type,
        question_id: loadData.data[id].question_id,
        question: loadData.data[id].question,
        star_rating_id: loadData.data[id].star_rating_id,
        rating: loadData.data[id].rating,
    })
    console.log("data", "=>", data)
    question_amount.type2++
    console.log("question_amount1", "=>", question_amount);
}

//Load tiêu đề
function render_title(text) {
    document.getElementById("title").innerHTML = text;
    document.title = text;
}
//Load các loại câu hỏi
function myFunction() {
    // var question_amount = {//Lưu id tương tự id của từng câu hỏi trên firebase
    //     type0: 0,
    //     type1: 0,
    //     type2: 0,
    //     type3: 0,
    // }
    for (var key in loadData.data) {
        switch (loadData.data[key].type) {
            case 0:
                getData0(key)
                render_question0(loadData.data[key].title_id, loadData.data[key].description_id, loadData.data[key].title, loadData.data[key].description)
                break
            case 1:
                getData1(key)
                // getData1(question_amount.type1++)

                render_question1(loadData.data[key].question_id, loadData.data[key].answer_id, loadData.data[key].question)
                break
            case 2:
                getData2(key)
                // getData1(question_amount.type1++)
                render_question2(loadData.data[key].question_id, loadData.data[key].question)
                break
        }
    }
}

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
                render_question2(question_amount.type2, data[key].question)
                data[key].question_id = question_amount.type2; data[key].star_rating_id = question_amount.type2
                question_amount.type2++
                break;
        }
    }
}
//Add các loại câu hỏi

function render_question0(title_idTextarea, description_idTextarea, title, description) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", ` 

    <div class="type1" id="type1${title_idTextarea}">

        <div class="row100">
            <div class="inputBx100" id="div1Question${title_idTextarea}">
                <textarea class="title_textarea" id="title${title_idTextarea}"  placeholder="${title}" value="${title}"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100" id="div1Description${description_idTextarea}">
                <textarea class="description_textarea" id="description${description_idTextarea}" placeholder="${description}" value="${description}"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <a onclick="delete_question0(${title_idTextarea})"><span class="material-icons">delete</span></a>

</div>`)
}

function render_question1(question_idTextarea, answer_idTextarea, question) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", `
    <div class="type2" id="type2${question_idTextarea}">

        <div class="row100">
            <div class="inputBx100" id="div1answer${answer_idTextarea}">
                <textarea class="title_textarea" id="1question${question_idTextarea}" placeholder="${question}" value="${question}"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100">
                <textarea class="description_textarea" disabled = true id="1answer${answer_idTextarea}" placeholder="Văn bản trả lời"  onkeypress="auto_grow(this);" onkeyup="auto_grow(this);"></textarea>
            </div>
        </div>
        <a onclick="delete_question1(${question_idTextarea})"><span class="material-icons">delete</span></a>

</div>`);
}
function render_question2(type2, question) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", `
    <div class="type3" id="type3${type2}">
        <div class="row100">
            <div class="inputBx100" id="div2Question${type2}">
                <textarea class="title_textarea" id="2question${type2}" onkeypress="auto_grow(this);"
                    onkeyup="auto_grow(this);" placeholder="${question}" value="${question}"></textarea>
            </div>
            <div id="star_rating${type2}">
            </div>
        </div>
        <a onclick="delete_question2(${type2})"><span class="material-icons">delete</span></a>
    </div>
`);
    $(function () {
        var rating = new starRating({ // create first star rating system on page load
            containerId: 'star_rating' + type2, // element id in the dom for this star rating system to use
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
        title: "Tiêu đề biểu mẫu",
        description_id: question_amount.type0,
        description: "Mô tả biểu mẫu",
    })
    render_question0(question_amount.type0, question_amount.type0, "Tiêu đề biểu mẫu", "Mô tả biểu mẫu")
    question_amount.type0++;
    console.log("question_amount", "=>", question_amount)
    console.log(data)
}

function add1() {
    data.push({
        type: 1,
        question_id: question_amount.type1,
        question: "Câu hỏi",
        answer_id: question_amount.type1,
        answer: [],
    })
    render_question1(question_amount.type1, question_amount.type1, "Câu hỏi")
    question_amount.type1++;
    console.log("question_amount", "=>", question_amount)
    console.log(data)
}

function add2() {
    data.push({
        type: 2,
        question_id: question_amount.type2,
        question: "Câu hỏi",
        star_rating_id: question_amount.type2,
        rating: [],
    })
    render_question2(question_amount.type2,"Câu hỏi")
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
        console.log("question_amount", "=>", question_amount);
        afterDelete()
    }
}

document.getElementById('btn-add0').addEventListener('click', add0);
document.getElementById('btn-add1').addEventListener('click', add1);
document.getElementById('btn-add2').addEventListener('click', add2);

sendForm.addEventListener('click', e => {
    e.preventDefault();
    var i = 0 //Thứ tự của từng câu hỏi
    var question_amount = {//Lưu id tương tự id của từng câu hỏi trên firebase
        type0: 0,
        type1: 0,
        type2: 0,
        type3: 0,
    }
    while (i < data.length) {
        // console.log("i", "=>", i)
        // console.log("Data.length", "=>", data.length)
        // console.log("data[i].type", "=>", data[i].type)

        switch (data[i].type) {
            case 0:
                c = document.getElementById("div1Question" + question_amount.type0).children;
                console.log("c[0]", "=>", c[0].value)
                if (c[0].value)
                    setQuestion00(i, c[0].value)
                b = document.getElementById("div1Description" + question_amount.type0).children;
                if (b[0].value)
                    setQuestion01(i, b[0].value)
                question_amount.type0++
                break
            case 1:
                console.log("div1answer", "=>", c[0].value)
                c = document.getElementById("div1answer" + question_amount.type1).children;
                if (c[0].value) {
                    console.log("c[0]", "=>", c[0].value)
                    setQuestion1(i, c[0].value)
                }
                question_amount.type1++
                break
            case 2:
                console.log("div1answer", "=>", c[0].value)
                console.log("question_amount", "=>", question_amount);
                c = document.getElementById("div2Question" + question_amount.type2).children;
                if (c[0].value) {
                    console.log("c[0]", "=>", c[0].value)
                    setQuestion2(i, c[0].value)
                }
                question_amount.type2++
                break
        }
        i++;
        console.log("data-answer", "=>", data)
    }
    selectFormsCollection.doc("0").get()
        .then(form => {
            if (form.exists) {
                loadAmount = form.data()
                formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId).update({
                    data: data,
                    link: window.location.href.replace("editform", "loadform?fname=" + formId),
                    question_amount: question_amount,
                })
                console.log('Data Successfully Written');
                alert("Lưu thành công!")
                // document.location = 'index.html'; 
            }
            else
                console.log('form does not exist');
        })
        .catch(error => { console.error(error) })
})

getLink.addEventListener("click", e => {
    e.preventDefault();
    const el = document.createElement('textarea');
    var url = window.location.href.replace("editform", "loadform?fname=" + formId)
    // var url = window.location.href.replace("EditForm.html", "loadform.html?fname=" + formId)
    selectFormsCollection.doc("0").get()
        .then(form => {
            if (form.exists) {
                loadAmount = form.data()
                formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId).update({
                    link: url,
                })
                console.log('Data Successfully Written');
                // document.location = 'index.html'; 
            }
            else
                console.log('form does not exist');
        })
        .catch(error => { console.error(error) })
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    window.open(url);
})
printForm.addEventListener("click", e => {
    e.preventDefault();
    window.print();
})

