import {generate_test_in_testlist} from './containers_generate.js';

let page;

let tests_list = document.querySelector('#tests_list');
let button_left = document.querySelector('#previous');
let button_right = document.querySelector('#next');

let first_page = document.querySelector('#first_page');
let second_page = document.querySelector('#second_page');
let third_page = document.querySelector('#third_page');

function change_page() {
    page = parseInt(document.querySelector("#num").innerHTML);
    let text = {
        page: page,
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
            if(data['max_page'] >= page){
                add_tests(data['tests'])
                change_number_page(data['max_page'])
            }else{
                window.location.href = `/tests-page${data['max_page']}`;
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function add_tests(data){
    for(const test of data){
        let test_div = document.createElement('div');
        test_div.classList.add("row");
        test_div.style.paddingTop = "20px";
        test_div.innerHTML = generate_test_in_testlist(test);
        test_div.addEventListener("click", function (){window.location.href = `/tests/${test[2]}`})
        tests_list.appendChild(test_div);
    }
}

function change_number_page(max_page){
    if(page == 1){
        button_left.classList.add('disabled');
        first_page.innerHTML = "<b>1</b>";
        first_page.href = "/tests-page1";
        second_page.innerHTML = "2";
        second_page.href = "/tests-page2";
        third_page.innerHTML = "3";
        third_page.href = "/tests-page3";
        button_right.href = "/tests-page2";
        return
    }
    else button_left.classList.remove('disabled');
    if(page == max_page){
        button_right.classList.add('disabled');
        first_page.innerHTML = `${max_page-2}`;
        first_page.href = `/tests-page${max_page-2}`;
        second_page.innerHTML = `${max_page-1}`;
        second_page.href = `/tests-page${max_page-1}`;
        third_page.innerHTML = `<b>${max_page}</b>`;
        third_page.href = `/tests-page${max_page}`;
        button_left.href = `/tests-page${max_page-1}`;
        return
    }
    else button_right.classList.remove('disabled');
    first_page.innerHTML = `${page-1}`;
    first_page.href = `/tests-page${page-1}`;
    button_left.href = `/tests-page${page-1}`;
    second_page.innerHTML = `<b>${page}</b>`;
    second_page.href = `/tests-page${page}`;
    third_page.innerHTML = `${page+1}`;
    third_page.href = `/tests-page${page+1}`;
    button_right.href = `/tests-page${page+1}`;
}

change_page();