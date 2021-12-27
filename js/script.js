let todoItems = [];

let wrapper = document.querySelector('.wrapper');
let input = document.querySelector('input');
let btn = document.querySelector('.btn')
let filter = document.querySelector('.filter')
let empty = document.querySelector('.empty')
let filterBtn = document.querySelectorAll('.filter-btn')
let form = document.querySelector('.form');
let listContainer = document.querySelector('.list-conatiner');
let all = document.querySelector('.all');
let completed = document.querySelector('.completed');
let uncompleted = document.querySelector('.uncompleted');


document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todos');
  if (ref) {
    todoItems = JSON.parse(ref);
    renderTodo(todoItems);
    if (ref.length === 0) {
      empty.style.display = 'block';
      filter.style.display = 'none';
    }
    empty.style.display = 'none';
    filter.style.display = 'flex';
  }
  if (todoItems.length === 0) {
    empty.style.display = 'flex';
    filter.style.display = 'none';
  }
});


completed.addEventListener('click', e => {
    e.preventDefault();
    checked();
    filterBtn.forEach(element => {
      element.classList.remove('active');
    });    
    completed.classList.add('active');
  } );
  
  uncompleted.addEventListener('click', e => {
    e.preventDefault();
    unChecked();
    filterBtn.forEach(element => {
      element.classList.remove('active');
    });   
    uncompleted.classList.add('active');
  } );
  
  all.addEventListener('click', e => {
    e.preventDefault();
    renderTodo(todoItems.sort((a, b) => a.checked - b.checked));
    filterBtn.forEach(element => {
      element.classList.remove('active');
    });   
    all.classList.add('active');
  } );
  
  

  
  function addTodo(text) {
    todo = {
      desc: text,
      checked: false,
      id: Date.now(),
    }
    todoItems.unshift(todo);
    renderTodo(todoItems.sort((a, b) => a.checked - b.checked));
    filter.style.display = 'flex';
    empty.style.display = 'none';
  }
  
  btn.addEventListener('click', e => {
    e.preventDefault();
    
    const text = input.value.trim();
    if (!text == '') {
      addTodo(text);
      input.value = '';
      input.focus();  
    }
    renderTodo(todoItems);
    
  });
  
  function checked() {
    let сheckedTodos = todoItems.filter(el => el.checked == true)
    renderTodo(сheckedTodos);
  }
  
  function unChecked() {
    let unCheckedTodos = todoItems.filter(el => el.checked == false)
    renderTodo(unCheckedTodos);
  }
  
  
  const list = document.querySelector('.list');

  list.addEventListener('click', e => {
    if (e.target.classList.contains('fa-check')) {
      const itemKey = e.target.closest('.list-item').dataset.key;
      toggleDone(itemKey);
    }
    renderTodo(todoItems.sort((a, b) => a.checked - b.checked));
    
    if (e.target.classList.contains('fa-trash')) {
      const itemKey = e.target.closest('.list-item').dataset.key;
      deleteTodo(itemKey)
    }



    if (e.target.classList.contains('span')) {
      const spans = document.querySelectorAll('.span');
      // const span = document.querySelector('.span');
      for (let i = 0; i < spans.length; i++) {
        spans[i].addEventListener('click', editTodo);
      }
    }



  });
  function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems = todoItems.filter(item => (item.id !== Number(key)))
    if (todoItems.length === 0) {
      empty.style.display = 'flex';
      filter.style.display = 'none';
    }
    filterBtn.forEach(element => {
      element.classList.remove('active');
    });   
    all.classList.add('active');
    renderTodo(todoItems);
    
  }
  
  
  function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    filterBtn.forEach(element => {
      element.classList.remove('active');
    });   
    all.classList.add('active');
  renderTodo(todoItems);
}

function renderTodo(arr) {
  // list.innerHTML = '';
  let li, span, div;
  list.innerHTML = '';
  arr.forEach(element => {
    let isChecked = element.checked? 'completed' :'';
    li = document.createElement('li');
    span = document.createElement('span');
    div = document.createElement('div');
    li.className = `list-item ${isChecked}`;
    li.setAttribute('data-key', `${element.id}`);
    span.classList.add('span');
    span.textContent = `${element.desc}`;
    div.classList.add('buttons');

    div.innerHTML = `
      <button class="item-check"><i class="fas fa-check"></i></button>
      <button class="item-del"><i class="fas fa-trash"></i></button>
    `;
  li.append(span, div);
  list.append(li); 
  listContainer.append(list);
  console.log('li: ', li);
  localStorage.setItem('todos', JSON.stringify(todoItems))
});
}
