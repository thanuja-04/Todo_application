let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");

//(4th)localStorage.removeItem("todoList");
//console.log(todoItemsContainer);


/*let todoList = [{
        text: "Learn HTML",
        uniqueNo: 1
    },
    {
        text: "Learn CSS",
        uniqueNo: 2
    },
    {
        text: "Learn Javascript",
        uniqueNo: 3
    },

];*/

function getTodoListFromLocalStorage() {
    let stringifiedTodoJist = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoJist);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
let count = todoList.length;

function onToDoStatesChanged(checkboxId, labelId, todoId) {
    let chexboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    //(4th)to persist the changes made in checked status in localStorage and after reload
    let todoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);

    todoItemsContainer.removeChild(todoElement);
    //delete TodoObject from todolist in localStorage
    let deleteElementIndex = todoList.findIndex(function(eachtodo) {
        let eachtodoId = "todo" + eachtodo.uniqueNo;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    //console.log(deleteElementIndex);
    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    //to add the checking statues after the localStorage is reloaded
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");

    inputElement.onclick = function() {
        onToDoStatesChanged(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);
    //console.log(todoItemsContainer);
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    //console.log(todoItemsContainer);
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    //(4th)persist the changes of the checked states.
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelElement.classList.add("checkbox-label");
    labelContainer.appendChild(labelElement);
    //console.log(todoItemsContainer);
    let deleteItemContainer = document.createElement("div");
    deleteItemContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteItemContainer);
    //console.log(todoItemsContainer);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteItemContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}


function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter the valid input");
        return;
    }
    count = count + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: count,
        isChecked: false
    };
    todoList.push(newTodo);
    //console.log(todoList);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}


let addTodoButton = document.getElementById("addTodoButton");
addTodoButton.onclick = function() {
    onAddTodo();
}