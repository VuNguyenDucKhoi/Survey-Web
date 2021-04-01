
const sendData = document.getElementById('sendData');
var loadData = []

var loadAmount = 0 //Lấy id của form đc chọn
var formId
var data = []

console.log("formId0", "=>", formId)
new URLSearchParams(window.location.search).forEach((value) => {
    formId = value
    console.log("formId1", "=>", formId)

    // const result = document.getElementById('demo')
    // result.append(`${name} : ${value}`)
})
selectFormsCollection.doc("0").get()
    .then(form => {
        if (form.exists) {
            loadAmount = form.data()
            console.log("loadAmount", "=>", loadAmount.id)
            // // formId = loadAmount.id
            console.log("formId2", "=>", formId)
            formsCollection.doc(uid).collection("lists").doc(formId.toString()).get()
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


function getData0(id) {
    selectFormsCollection.doc("0").get()
        .then(form => {
            if (form.exists) {
                loadAmount = form.data()
                // formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId.toString()).get()
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
                // formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId.toString()).get()
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

//Add các loại câu hỏi
function render_question0(title_idTextarea, description_idTextarea, title, description) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", ` 
    <div class="type1">
    <form>
        <div class="row100">
            <div class="inputBx100">
                <textarea class="title_textarea" id="title${title_idTextarea}" placeholder="${title}" value="${title}"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100">
                <textarea class="description_textarea" id="description${description_idTextarea}" placeholder="${description}" value="${description}"></textarea>
            </div>
        </div>
    </form>
</div>`)
}
function render_question1(question_idTextarea, answer_idTextarea, question) {
    var html = document.getElementById("question");
    html.insertAdjacentHTML("beforeend", `<div class="type2">
    <form>
        <div class="row100">
            <div class="inputBx100">
                <textarea id="1question${question_idTextarea}" placeholder="${question}" value="${question}"></textarea>
            </div>
        </div>
        <div class="row100">
            <div class="inputBx100" id="div1answer${answer_idTextarea}">
                <textarea id="1answer${answer_idTextarea}" placeholder="Văn bản trả lời"></textarea>
            </div>
        </div>
    </form>
</div>`);
}

sendData.addEventListener('click', e => {
    e.preventDefault();
    selectFormsCollection.doc("0").get()
        .then(form => {
            if (form.exists) {
                loadAmount = form.data()
                // formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId.toString()).get()
                    .then(form => {
                        if (form.exists) {
                            loadData = form.data()
                            var i = 0 //Thứ tự của từng câu hỏi
                            var question_amount = {//Lưu id tương tự id của từng câu hỏi trên firebase
                                type0: 0,
                                type1: 0,
                                type2: 0,
                                type3: 0,
                            }
                            while (i < loadData.data.length) {
                                // console.log("i", "=>", i)
                                // console.log("loadData.Data.length", "=>", loadData.data.length)
                                // console.log("data[i].type", "=>", data[i].type)
                                switch (loadData.data[i].type) {
                                    case 0:
                                        break
                                    case 1:
                                        c = document.getElementById("div1answer" + question_amount.type1).children;
                                        console.log("c[0]", "=>", c[0].value)
                                        setAnswer1(i, c[0].value)
                                        question_amount.type1++
                                        break
                                }
                                i++;
                                console.log("data-answer", "=>", data)
                            }
                            console.log("formId3", "=>", formId)
                            formsCollection.doc(uid).collection("lists").doc(formId.toString()).update({
                                data: data,
                            })
                                .then(() => { 
                                    alert("Cảm ơn bạn vì đã thực hiện khảo sát!!")
                            })
                                .catch(error => { console.error(error) });
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
    // setAnswers()
    // setAnswer1(1, "hello")
    // document.getElementById("demo").innerHTML = sum;

})

