import {generate_question_container, generate_question_info} from './containers_generate.js';

const questions = document.querySelector('.questions');
const add_question = document.querySelector('.add_question');
const create_test = document.querySelector('.create_test');
const settings = document.querySelector('.settings');

var i = 1;

function AddQuestion(){
    let new_question = document.createElement('div');
    new_question.classList.add('question');
    new_question.id = question${i};
    var type_question = type_question${i};
    new_question.innerHTML = generate_question_container(type_question)

    const radioButtons = new_question.querySelectorAll(input[name=${type_question}]);

    for(const radioButton of radioButtons){
        radioButton.addEventListener('change', function (){
            new_question_container(new_question.id, radioButton.getAttribute('value'))
        });
    }

    function new_question_container(id, value) {
        let question_container = document.querySelector('#'+id);
        var a = question_container.querySelector(#${id}_container);
        if (a) question_container.removeChild(a);
        let question_info = document.createElement('div');
        question_info.id = ${id}_container;
        question_info.innerHTML = generate_question_info(id, value);
        question_container.appendChild(question_info);
        question_info.querySelector('.new_field').addEventListener('click', function(){ add_answer(id, value) });
    }

    function add_answer(id, value){
        let answers_box = document.getElementById(${id}_answers);
        let new_answer = document.createElement('p');
        new_answer.innerHTML = value == "Выбор" ? <input> <input type="checkbox"> : <input>;
        answers_box.appendChild(new_answer);
    }

    i = i+1;
    questions.appendChild(new_question)
}

function CreateTest(){
    const test_name = settings.querySelector("input").value;
    const is_public = settings.querySelector("input:checked") !== null;
    let questionsArray = [];
    for(const question of questions.querySelectorAll('.question')){
        let question_container = question.querySelector(#${question.id}_container);
        const type_question = (question_container.querySelector("label").textContent == "Вопрос с выбором ответа:") ? "Выбор" : "Ввод";
        let question_grade = question.querySelector(".grade_question").value;
        let arrayQuestion = [];
        let question_text = question_container.querySelector(input[class='question_input']).value;
        arrayQuestion.push(question_text, type_question, question_grade);
        for(let answer of question_container.querySelector(#${question.id}_answers).querySelectorAll("p")){
            let answer_text = answer.querySelector(".question_answer").value;
            let checkbox = answer.querySelector("input[type='checkbox']");
            let is_true = (checkbox !== null) ? checkbox.checked : true;
            arrayQuestion.push([answer_text, is_true]);
        }
        questionsArray.push(arrayQuestion);
    }
    let text = {
        name: test_name,
        is_public: is_public,
        questionsArray: questionsArray,
    }
    let json = JSON.stringify(text);
    console.log(json);
    $.ajax({
        url: '/event/save-json/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: $.toJSON(json),
        dataType: 'text',
        success: function(result) {
            alert(result.Result);
        }
    });
}

add_question.addEventListener('click', AddQuestion);
create_test.addEventListener('click', CreateTest);