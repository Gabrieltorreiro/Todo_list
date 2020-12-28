let addBtn = document.querySelector("#addBtn");
let taskInput = document.querySelector("#taskInput");
let todoList = document.querySelector(".todoList");
let buttons = document.querySelector(".buttons");
let finishAll = document.querySelector("#finishAll");
let deleteAll = document.querySelector("#deleteAll");
let tasks = [];

addBtn.addEventListener("click", () => {
    tasks.push(buffer());
    setTask();
    printTasks();
    taskInput.value = "";
});


finishAll.addEventListener("click", () => {
    tasks.forEach((item) => {
        item.complete = item.complete ? false : true;
    });
    setTask();
    printTasks();
});

deleteAll.addEventListener("click", () => {
    tasks = [];
    setTask();
    printTasks();
    buttons.style.display = "none";
});

function setTask() {
    localStorage.setItem("todo", JSON.stringify(tasks));
}

function printTasks() {
    buttons.style.display = "grid";
    todoList.innerHTML = "";
    tasks.forEach((item) => {
        todoList.innerHTML +=
            `<div class="task">
                <input type="checkbox" onclick="finished(${item.id})" ${item.complete == true ? "checked" : ""}>
                <input type="text" value="${item.text}" readonly>
                <input type="button" onclick="remove(${item.id})" value="Delete">
            </div>`;
    });
}

function finished(i) {
    tasks.forEach((item) => {
        if (item.id == i) {
            item.complete = item.complete ? false : true;
        }
    });
    setTask();
    printTasks();
}

//Remove an item from localStorage using index;
function remove(i) {
    let buf = [];
    tasks.forEach((item) => {
        if (item.id != i) {
            buf.push(item);
        }
    });
    tasks = buf;
    setTask();
    printTasks();
}

//Get tasks on localStorage and set in tasks
function getTasks() {
    if (localStorage.getItem("todo") == null || localStorage.getItem("todo") == "") {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("todo"));
    }
}

function buffer() {
    let buf = {};
    buf.id = tasks.length;
    buf.text = taskInput.value;
    buf.complete = false;
    return buf;
}

getTasks();
printTasks();
buttons.style.display = "none";