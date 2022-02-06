const questions = document.querySelector('.questions');
const add_question = document.querySelector('.add_question');
var i = 1;

function AddQuestion(){
    let new_question = document.createElement('div');
    new_question.classList.add('question');
    new_question.id = 'question'+ i ;
    var type_question = 'type_question'+i;
    new_question.innerHTML = ' <label> Тип вопроса: </label>\n' +
        '                <p><input type="radio" name='+type_question+' value="Выбор"> Вопрос с вариантами выбора\n' +
        '                <input type="radio" name='+type_question+' value="Ввод"> Вопрос с вводом ответа </p>';

    const radioButtons = new_question.querySelectorAll('input[name='+type_question+']');

    for(const radioButton of radioButtons){
        radioButton.addEventListener('change', function (){
            new_question_container(new_question.id, radioButton.getAttribute('value'))
        });

    }

    function new_question_container(id, value) {
        console.log(id);
        console.log(value);
        let question_container = document.querySelector('#'+id);
        let new_question_container = document.createElement('div');
        if (value == 'Выбор'){
            new_question_container.innerHTML = ' <label> Введите вопрос:</label>\n' +
                '  <p> <input> </p> ' +
                '<label>Варианты ответа</label>' +
                '<p> <input> <input type="checkbox"> </p>' +    //надо прописать поля name для чекбоксов
                '<p> <input>  <input type="checkbox"> </p>' +
                '<button class = \'new_field\'>Добавить поле ввода</button>';


            question_container.appendChild(new_question_container);
        }
    }

    i = i+1;
    questions.appendChild(new_question)
}

add_question.addEventListener('click', AddQuestion);