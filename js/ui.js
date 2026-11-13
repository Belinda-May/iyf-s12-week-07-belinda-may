import { filterTasks, countActiveTasks } from './todo-logic.js';

const taskList = document.querySelector('#task-list');
const itemsLeft = document.querySelector('#items-left');

export function renderTasks(tasks, currentFilter) {
  taskList.textContent = '';

  const visibleTasks = filterTasks(tasks, currentFilter);

  visibleTasks.forEach((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });

  updateCounter(tasks);
}

function updateCounter(tasks) {
  const activeCount = countActiveTasks(tasks);

  itemsLeft.textContent = `${activeCount} ${
    activeCount === 1 ? 'item' : 'items'
  } left`;
}