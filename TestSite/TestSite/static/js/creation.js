import {generate_question_container, generate_question_info} from './containers_generate.js';

const questions = document.querySelector('.questions');
const add_question = document.querySelector('.add_question');
const create_test = document.querySelector('.create_test');
const settings = document.querySelector('.settings');

var i = 1;

function AddQuestion(){
    let new_question = document.createElement('div');
    new_question.classList.add('question');
    new_question.id = `question${i}`;
    var type_question = `type_question${i}`;
    new_question.innerHTML = generate_question_container(type_question)

    const radioButtons = new_question.querySelectorAll(`input[name=${type_question}]`);

    for(const radioButton of radioButtons){
        radioButton.addEventListener('change', function (){
            new_question_container(new_question.id, radioButton.getAttribute('value'))
        });
    }

    function new_question_container(id, value) {
        let question_container = document.querySelector('#'+id);
        var a = question_container.querySelector(`#${id}_container`);
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
        new_answer.innerHTML = value == "Выбор" ? `<input> <input type="checkbox">` : `<input>`;
        answers_box.appendChild(new_answer);
    }

    i = i+1;
    questions.appendChild(new_question)
}

function CreateTest(){
    var test_name = settings.querySelector("input").value;
    var is_public = settings.querySelector("input:checked") !== null;
    for(const question in questions.querySelectorAll("div")){
        console.log(question.id);
    }
}

add_question.addEventListener('click', AddQuestion);
create_test.addEventListener('click', CreateTest);