let mainInput = document.querySelector(`#main-input`);
let submitBtn = document.querySelector(`#btn`);
let toDoUl = document.querySelector(`ul`);
let editInput = document.querySelector(`#edit-input`);
let editBtn = document.querySelector(`#submit`);
let indexOfParent = 0;
let toDoStorage = [];



submitBtn.addEventListener(`click`, addNewItem);
document.addEventListener(`DOMContentLoaded`, getTodoListOnLoad);
toDoUl.addEventListener('click', deleteEdit);


function addNewItem(e){

    e.preventDefault();

    if(mainInput.value!=""){ 
    let todoDiv= document.createElement('div')
      let newItem = `
        <li>${mainInput.value}</li>
        <i class="fas fa-pen edit"></i>
        <i class="far fa-trash-alt delete"></i>
      `;
      todoDiv.innerHTML= newItem;
      toDoUl.appendChild(todoDiv)
      todoDiv.classList.add('box')

      saveToLocalStorage(mainInput.value);
    }
    mainInput.value="";
}


function saveToLocalStorage(todo){

    if(localStorage.getItem('toDoStorage')==null){
      toDoStorage=[];
    }
    else {
      toDoStorage=JSON.parse(localStorage.getItem('toDoStorage'))
    }
    toDoStorage.push(todo);
    localStorage.setItem('toDoStorage', JSON.stringify(toDoStorage))
}

function getTodoListOnLoad(){
    if(localStorage.getItem('toDoStorage')){
      toDoStorage= JSON.parse(localStorage.getItem('toDoStorage'))
    }

    toDoStorage.forEach(todo => {
      let todoDiv= document.createElement('div')
      let newItem = `
        <li>${todo}</li>
        <i class="fas fa-pen edit"></i>
        <i class="far fa-trash-alt delete"></i>
      `;
      todoDiv.innerHTML= newItem;
      toDoUl.appendChild(todoDiv)
      todoDiv.classList.add('box')
    });
}

function deleteEdit(e){

  if(e.target.classList.contains('delete')){
    let parentItem = e.target.parentNode;
    let array=JSON.parse(localStorage.getItem('toDoStorage'))
    let parentItemDelete=array.indexOf(parentItem.innerText)
    array.splice(parentItemDelete, 1)
    localStorage.setItem('toDoStorage', JSON.stringify(array))
    parentItem.remove();
  }

  if(e.target.classList.contains('edit')){
    let itemText = e.target.parentNode.innerText;
    let allItemsText = JSON.parse(localStorage.getItem('toDoStorage'))
    indexOfParent = allItemsText.indexOf(itemText.toLowerCase());
    editInput.value = allItemsText[indexOfParent];
    editInput.style.display = `block`;
    mainInput.style.display = `none`;
    editBtn.style.display = `block`;
    submitBtn.style.display = `none`;
  }

}

editBtn.addEventListener (`click`, function () {
  let allItemsText=JSON.parse(localStorage.getItem('toDoStorage'));
  allItemsText[indexOfParent] = editInput.value;
  localStorage.setItem('toDoStorage', JSON.stringify(allItemsText));
});