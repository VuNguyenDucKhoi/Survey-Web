const sendForm = document.getElementById('sendForm');
const sendData = document.getElementById('sendData');
var loadAmount = []
var data_value = []

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
                setQuestion00(i, c[0].value)
                b = document.getElementById("div1Description" + question_amount.type0).children;
                setQuestion01(i, b[0].value)
                question_amount.type0++
                break
            case 1:
                c = document.getElementById("div1answer" + question_amount.type1).children;
                console.log("c[0]", "=>", c[0].value)
                setQuestion1(i, c[0].value)
                question_amount.type1++
                break
            case 2:
                c = document.getElementById("div2Question" + question_amount.type2).children;
                console.log("c[0]", "=>", c[0].value)
                setQuestion2(i, c[0].value)
                question_amount.type2++
                break
        }
        i++;
        console.log("data-answer", "=>", data)
    }

    formsCollection.doc(uid).collection("lists").doc().set({
        data: data,
        link: "",
        title: 'Mẫu không có tiêu đề',
        question_amount: question_amount,
    })
        .then(() => { console.log('Data Successfully Written'); document.location = 'index.html'; })
        .catch(error => { console.error(error) });
})

// sendData.addEventListener('click', e => {

// })
