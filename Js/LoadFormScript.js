
const sendData = document.getElementById('sendData');
var loadData = []

var loadAmount = 0 //Lấy id của form đc chọn
var formId
var data = []

selectFormsCollection.doc("0").get()
    .then(form => {
        if (form.exists) {
            loadAmount = form.data()
            console.log("loadAmount", "=>", loadAmount.id)
            formId = loadAmount.id
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
            formId = loadAmount.id
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
            formId = loadAmount.id
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


function setAnswers() {
    for (var key in data) {
        switch (data[key].type) {
            case 0:

                break
            case 1:
                console.log("key", "=>", key)
                render_Answer1(key, data[key].answer_id)
                break
        }
    }
}


async function render_Answer1(index, answer_idTextarea) {
    // var html = document.getElementById("div1answer" + id);
    // html.insertAdjacentHTML("beforeend", `
    //     <script type="text/javascript">
    //         document.getElementById("div1answer"+id).addEventListener("onload", setAnswer1(${index}, 1answer${id}.value));

    //     </script>
    // `);
}



//Load tiêu đề
function render_title(text) {
    document.getElementById("title").innerHTML = text;
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
                render_question0(loadData.data[key].title_id, loadData.data[key].description_id)
                break
            case 1:
                getData1(key)
                // getData1(question_amount.type1++)

                render_question1(loadData.data[key].question_id, loadData.data[key].answer_id)
                break
        }
    }
}

//Add các loại câu hỏi
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
                formId = loadAmount.id
                formsCollection.doc(uid).collection("lists").doc(formId.toString()).get()
                    .then(form => {
                        if (form.exists) {
                            loadData = form.data()
                            var i = 0
                            var j = 0
                            while (i < loadData.data.length) {
                                // console.log("i", "=>", i)
                                // console.log("loadData.Data.length", "=>", loadData.data.length)
                                // console.log("data[i].type", "=>", data[i].type)
                                switch (loadData.data[i].type) {
                                    case 0:
                                        break
                                    case 1:
                                        c = document.getElementById("div1answer"+j).children;
                                        console.log("c[0]", "=>", c[0].value)
                                        setAnswer1(i, c[0].value)
                                        j++
                                        break
                                }
                                i++;
                                console.log("data-answer", "=>", data)
                            }
                            formsCollection.doc(uid).collection("lists").doc(formId.toString()).update({
                                data : data,
                            })
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

