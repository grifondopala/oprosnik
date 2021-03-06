export function generate_question_container(type_question){
    var text = `<label> Тип вопроса: </label>
                <p><input type="radio" name=${type_question} value="Выбор"> Вопрос с вариантами выбора
                <input type="radio" name=${type_question} value="Ввод"> Вопрос с вводом ответа
                <input class="grade_question"><label>Балл за вопрос</label>
                <button class="delete_question">Удалить вопрос</button></p>`;
    return text;
}

export function generate_question_info(id, value){
    var text = ``
    if (value == "Выбор"){
        text = text + `<label>Вопрос с выбором ответа:</label>
                       <p> <input class="question_input"> </p>
                       <p> Варианты ответа: </p>
                       <div id=${id}_answers>
                           <p> <input class="question_answer"> <input type="checkbox"> </p>
                           <p> <input class="question_answer">  <input type="checkbox"> </p>
                       </div>
                       <button class = 'new_field'>Добавить поле ввода</button>`;
    }else{
        text = text + `<label> Вопрос с вводом ответа:</label>
                       <p> <input class="question_input"> </p>
                       <p> Правильные ответы: </p>
                       <div id=${id}_answers>
                           <p> <input class="question_answer"></p>
                       </div>
                       <button class = 'new_field'>Добавить поле ввода</button>`;
    }
    return text;
}
export function generate_display_right(url){
    var text = `<label>Тест успешно создан! Ссылка на тест: http://oprosnik.com/tests/${url}</label>
                <p><button onclick="window.location.href= '/my-tests'">Мои тесты</button>
                <button onclick="window.location.href= '/main'">На главную</button></p>`;
    return text;
}
export function generate_display_wrong(){
    var text = `<label>Все поля должны быть заполнены, тест должен содержать хотя бы 1 вопрос</label>`;
    return text;
}

export function generate_test_in_testlist(data){
    var text = `<div class="col">
                    <p><label>${data[0]}</label><p>
                    <p><label>Создатель: ${data[1]}</label><p>
                    <p><label>Пользователей, прошедших тест: ${data[3]}</label><p>
                </div>`
    return text;
}

export function generate_solve_test_question_div(number, question_text, grade){
    var text = `<h2>${number}. ${question_text}</h2>
                <h3>Баллы за вопрос: ${grade}</h3>`;
    return text;
}

export function generate_solve_test_answer(type, text){
    return (type == 'Выбор') ? `<p><label>${text}</label><input type="checkbox"></p>` : '<p><input></p>';
}