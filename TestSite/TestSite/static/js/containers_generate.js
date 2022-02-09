export function generate_question_container(type_question){
    var text = `<label> Тип вопроса: </label>
                <p><input type="radio" name=${type_question} value="Выбор"> Вопрос с вариантами выбора
                <input type="radio" name=${type_question} value="Ввод"> Вопрос с вводом ответа </p>`;
    return text;
}

export function generate_question_info(id, value){
    var text = `<label> Введите вопрос:</label>
                <p> <input> </p>`
    if (value == "Выбор"){
        text = text + `<p> Варианты ответа: </p>
                       <div id=${id}_answers>
                           <p> <input> <input type="checkbox"> </p>
                           <p> <input>  <input type="checkbox"> </p>
                       </div>
                       <button class = 'new_field'>Добавить поле ввода</button>`;
    }else{
        text = text + `<p> Правильные ответы: </p>
                       <div id=${id}_answers>
                           <p> <input></p>
                       </div>
                       <button class = 'new_field'>Добавить поле ввода</button>`;
    }
    return text;
}