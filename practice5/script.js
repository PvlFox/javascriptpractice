// Выбор элементов
const mainTitle = document.getElementById('main-title');

const firstParagraph = document.querySelector('p.content-paragraph');

const allParagraphs = document.querySelectorAll('p.content-paragraph');
console.log(allParagraphs);

// Изменение содержимого и атрибутов
mainTitle.textContent = "Осваиваем DOM!";

const demoLink = document.getElementById('demo-link');
demoLink.href = "https://www.google.com";

allParagraphs[1].textContent = "Это измененный второй абзац.";

// Добавление и удаление элементов
const newParagraph = document.createElement('p');
newParagraph.textContent = "Это совершенно новый абзац!";

const container = document.getElementById('container');

// Добавляем в конец секции
container.appendChild(newParagraph);


firstParagraph.classList.add('highlight');
setTimeout(() => {
  firstParagraph.classList.remove('highlight');
}, 2000);

const projectTitle = document.querySelector('#project-area h2');

projectTitle.addEventListener('click', () => {
  projectTitle.classList.toggle('hidden');
});

// Обработка событий
const actionButton = document.getElementById('action-button');
actionButton.addEventListener('click', () => {
  document.body.style.backgroundColor = 'aliceblue';
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
  location.reload();
});

// Находим элементы DOM
const taskInput = document.getElementById('new-todo');
const addTaskButton = document.getElementById('add-todo');
const taskList = document.getElementById('todo-list');

// Массив для хранения задач
let tasks = [];

// Загрузка задач из localStorage при старте
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// Сохранение задач в localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция добавления задачи
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Введите текст задачи!');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
  saveTasks();
}

// Функция отрисовки задач
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add('completed');
    }

    // Клик по задаче - переключение статуса
    li.addEventListener('click', () => {
      toggleTaskStatus(task.id);
    });

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      deleteTask(task.id);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Функция переключения статуса задачи
function toggleTaskStatus(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    saveTasks();
  }
}

// Функция удаления задачи
function deleteTask(id) {
  const confirmed = confirm('Вы действительно хотите удалить эту задачу?');
  if (confirmed) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    saveTasks();
  }
}

// Обработчики событий
addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

loadTasks();
renderTasks();
