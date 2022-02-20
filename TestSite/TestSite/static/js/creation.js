import {generate_question_container, generate_question_info, generate_display_right, generate_display_wrong} from './containers_generate.js';

const questions = document.querySelector('.questions');
const add_question = document.querySelector('.add_question');
const create_test = document.querySelector('.create_test');
const settings = document.querySelector('.settings');

var i = 1;

function AddQuestion(){
    let new_question = document.createElement('div');
    new_question.classList.add('question');
    new_question.id = `question${i}`;
    let type_question = `type_question${i}`;
    new_question.innerHTML = generate_question_container(type_question)

    const radioButtons = new_question.querySelectorAll(`input[name=${type_question}]`);


    for(const radioButton of radioButtons){
        radioButton.addEventListener('change', function (){
            new_question_container(new_question.id, radioButton.getAttribute('value'))
        });
    }

    new_question.querySelector('.delete_question').addEventListener('click', function (){ document.querySelector(`#${new_question.id}`).remove(); });

    function new_question_container(id, value) {
        let question_container = document.querySelector('#'+id);
        let a = question_container.querySelector(`#${id}_container`);
        if (a) question_container.removeChild(a);
        let question_info = document.createElement('div');
        question_info.id = `${id}_container`;
        question_info.innerHTML = generate_question_info(id, value);
        question_container.appendChild(question_info);
        question_info.querySelector('.new_field').addEventListener('click', function(){ add_answer(id, value) });
    }

    function add_answer(id, value){
        let answers_box = document.getElementById(`${id}_answers`);
        let new_answer = document.createElement('p');
        new_answer.innerHTML = value == "Выбор" ? `<input class="question_answer"> <input type="checkbox">` : `<input class="question_answer">`;
        answers_box.appendChild(new_answer);
    }

    i = i+1;
    questions.appendChild(new_question)
}

function CreateTest(){
    const test_name = settings.querySelector("input").value;
    const is_public = settings.querySelector("input:checked") !== null;
    let maxgrade = 0;
    let questionsArray = [];
    let wrong = false;
    for(const question of questions.querySelectorAll('.question')) {
        let question_container = question.querySelector(`#${question.id}_container`);
        let type_question, question_grade;
        if (question_container) {
            type_question = (question_container.querySelector("label").textContent == "Вопрос с выбором ответа:") ? "Выбор" : "Ввод";
        } else {
            wrong = true;
            break;
        }
        if (question.querySelector(".grade_question").value != '') {
            question_grade = parseInt(question.querySelector(".grade_question").value);
        } else {
            wrong = true;
            break;
        }
        let arrayQuestion = [];
        let question_text = question_container.querySelector(`input[class='question_input']`).value;
        if (question_text == ''){
            wrong = true;
            break;
        }
        arrayQuestion.push(question_text, type_question, question_grade);
        for (let answer of question_container.querySelector(`#${question.id}_answers`).querySelectorAll("p")) {
            let answer_text = answer.querySelector(".question_answer").value;
            if (answer_text == '') wrong = true;
            let checkbox = answer.querySelector("input[type='checkbox']");
            let is_true = (checkbox !== null) ? checkbox.checked : true;
            arrayQuestion.push([answer_text, is_true]);
        }
        questionsArray.push(arrayQuestion);
        if(wrong) break;
        maxgrade = maxgrade + parseInt(question_grade);
    }
    if(test_name == '' || questions.querySelectorAll('.question').length == 0) wrong = true;
    if(!wrong){
        let text = {
            name: test_name,
            is_public: is_public,
            maxgrade: maxgrade,
            questionsArray: questionsArray,
        }
        let json = JSON.stringify(text)
        $.ajax({
            url: "",
            type: "POST",
            dataType: "json",
            data: json,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,  // don't forget to include the 'getCookie' function
            },
            success: (data) => {
                let url = data['url'];
                show_display(url, true)
            },
            error: (error) => {
                console.log(error);
            }
        });
    }else{
        show_display("",false);
    }
}

function show_display(url, is_created){
    let display = document.createElement('div');
    display.classList.add('display');
    if(document.querySelector(".display")) document.querySelector(".display").remove()
    if(is_created){
        let test_div = document.querySelector(".test_div");
        test_div.style.pointerEvents='none';
        for(var new_field_button of document.querySelectorAll(".new_field")) new_field_button.remove();
        add_question.remove();
        create_test.remove();
        display.innerHTML = generate_display_right(url);
        display.style.backgroundColor = "#19865C";
    }else{
        display.innerHTML = generate_display_wrong();
        display.style.backgroundColor = "#bd2828";
    }
    document.getElementsByTagName('body')[0].appendChild(display);
}

add_question.addEventListener('click', AddQuestion);
create_test.addEventListener('click', CreateTest);