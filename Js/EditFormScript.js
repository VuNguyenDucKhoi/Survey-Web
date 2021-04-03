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
            console.log("loadAmount", "=>", loadAmount.id)
            formId = loadAmount.id
            console.log("formId2", "=>", formId)
            formsCollection.doc(uid).collection("lists").doc(formId).get()
                .then(form => {
                    if (form.exists) {
                        loadData = form.data()
                        // this.data = loadData.data
                        // editData(0, "hello")
                        console.log("Loaddata", "=>", loadData.data)
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
    selectFormsCollection.doc("0").get()
        .then(form => {
            if (form.exists) {
                loadAmount = form.data()
                formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId).get()
                    .then(form => {
                        if (form.exists) {
                            loadData = form.data()
                            data.push({
                                type: loadData.data[id].type,
                                title_id: loadData.data[id].title_id,
                                title: loadData.data[id].title,
                                description_id: loadData.data[id].description_id,
                                description: loadData.data[id].description,
                            })
                            console.log("data", "=>", data)
                            question_amount.type0++
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
    // console.log("data", "=>", data)
}
// function setAnswers0(index, answer) {
//     data[index].title.push(answer1)
//     data[index].description.push(answer)
// }
function getData1(id) {
    selectFormsCollection.doc("0").get()
        .then(form => {
            if (form.exists) {
                loadAmount = form.data()
                formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId).get()
                    .then(form => {
                        if (form.exists) {
                            loadData = form.data()
                            data.push({
                                type: loadData.data[id].type,
                                question_id: loadData.data[id].question_id,
                                question: loadData.data[id].question,
                                answer_id: loadData.data[id].answer_id,
                                answer: loadData.data[id].answer,
                            })
                            console.log("data", "=>", data)
                            question_amount.type1++
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

}
function setAnswer1(index, answer) {
    data[index].answer.push(answer)
    console.log("answer", "=>", answer)
}

// var value
// async function myDisplay() {
//     value = await formsCollection.doc(uid).collection("lists").doc(formId.toString()).get()
//         .then(form => {
//             if (form.exists) {
//                 loadData = form.data().data.length
//                 return loadData
//             }
//             else
//                 console.log('form does not exist');
//         })
//         .catch(error => { console.error(error) })
//     console.log("value1", "=>", value)
// }

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
        }
    }
}

//Loại lại danh sách câu hỏi sau khi xoá
function afterDelete() {
    document.getElementById("question").outerHTML = `<div id="question">
    </div>`
    for (var key in data) {
        switch (data[key].type) {
            case 0:
                render_question0(data[key].title_id, data[key].description_id, data[key].title, data[key].description)
                break
            case 1:
                render_question1(data[key].question_id, data[key].answer_id, data[key].question)
                break
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
// Thêm câu hỏi
function add0() {
    data.push({
        type: 0,
        title_id: question_amount.type0,
        title: '',
        description_id: question_amount.type0,
        description: '',
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
        question: '',
        answer_id: question_amount.type1,
        answer: [],
    })
    render_question1(question_amount.type1, question_amount.type1, "Câu hỏi")
    question_amount.type1++;
    console.log("question_amount", "=>", question_amount)
    console.log(data)
}
// Xoá câu hỏi
function delete_question0(id_question) {
    var a = -1
    for (var i = 0; i < data.length; i++) {
        if (data[i].title_id == id_question) {
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
        if (data[i].question_id == id_question) {
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
        if (data[i].question_id == id_question) {
            a = i;
            break;
        }
    }
    var myQuestion = document.getElementById("type3" + id_question.toString());
    if (a != -1) {
        myQuestion.remove()
        data.splice(a, 1);
        question_amount.type2--
        console.log("data2", "=>", data);
        afterDelete()
    }
}

document.getElementById('btn-add0').addEventListener('click', add0);
document.getElementById('btn-add1').addEventListener('click', add1);

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
                    link: window.location.href.replace("/EditForm.html", "/loadForm.html?fname=" + formId),
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
    // var url = window.location.href.replace("/html/EditForm.html", "/loadForm.html?fname=" + formId)
    var url = window.location.href.replace("/EditForm.html", "/loadForm.html?fname=" + formId)
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

