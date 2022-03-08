import {generate_solve_test_answer, generate_solve_test_question_div} from "./containers_generate.js";

let test_array;
let test_name;

$.ajax({
        url: "",
        type: "GET",
        dataType: "json",
        data: JSON.stringify({}),
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
        },
        success: (data) => {
            test_array = data['test_array'];
            test_name = data['test_name'];
            create_test();
        },
        error: (error) => {
            console.log(error);
        }
    });

function create_test(){
    document.querySelector("#test_name").innerHTML = test_name;
    let test_div = document.querySelector('.test_div');
    let number = 1;
    for(const question of test_array){
        let question_div = document.createElement('div');
        question_div.innerHTML = generate_solve_test_question_div(number++, question['question_text'], question['question_grade']);
        question_div.classList.add('question');
        let answers_div = document.createElement('div');
        if(question['question_type'] == 'Ввод') answers_div.innerHTML = generate_solve_test_answer('Ввод', '')
        else{
            for(const answer of question['question_answers']){
                answers_div.innerHTML+= generate_solve_test_answer('Выбор', answer['answer_text']);
            }
        }
        question_div.appendChild(answers_div);
        test_div.appendChild(question_div);
    }
}

function solve_test(){
    let answers = []
    for(const question of document.querySelectorAll('.question')){
        let answer_array = []
        for(const answer of question.querySelector('div').querySelectorAll('p')){
            if(answer.innerHTML == '<input>'){
                answer_array.push(answer.querySelector('input').value);
            }else{
                answer_array.push(answer.querySelector('input').checked)
            }
        }
        answers.push(answer_array);
    }
    let count_right = 0;
    let grade = 0;
    for(var i = 0; i<test_array.length; i++){
        let question_answers = test_array[i]['question_answers'];
        let true_answer;
        if(test_array[i]['question_type'] == 'Выбор'){
            true_answer = true;
            for(var j=0; j<question_answers.length; j++){
                if(question_answers[j]['is_true'] != answers[i][j]){
                    true_answer = false;
                    break
                }
            }
        }else{
            true_answer = false;
            for(var j=0; j<question_answers.length; j++){
                if(question_answers[j]['answer_text'] == answers[i][0]){
                    true_answer = true;
                    break;
                }
            }
        };
        if(true_answer){
            count_right++;
            grade += test_array[i]['question_grade'];
        }
    }
    $.ajax({
        url: "",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({}),
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
        },
        success: (data) => {
            test_array = data['test_array'];
            test_name = data['test_name'];
            create_test();
        },
        error: (error) => {
            console.log(error);
        }
    });
}

let send_answers = document.querySelector('.send_answers');
send_answers.addEventListener('click', solve_test);