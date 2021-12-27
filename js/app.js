let wrapper = document.querySelector('.wrapper');

let ul = document.createElement('ul');
let btn = document.querySelector('button')
let input = document.querySelector('input');


let todos = [];

function Todo(description) {
  this.description = description,
  this.completed = true;
}
btn.addEventListener('click', add);


function add(e) {
  e.preventDefault();
  todos.push(new Todo(input.value));
  input.value = '';
  render();
}



function deleted(e) {
  // e.preventDefault();
}

function checked(e) {

}

function render() {
  console.log('todos:',todos);
}

