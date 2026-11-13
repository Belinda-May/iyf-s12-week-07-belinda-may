
import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  clearCompletedTasks,
} from './todo-logic.js';

import {
  tasks,
  currentFilter,
  setTasks,
  setFilter,
} from './state.js';

import { saveTasks } from './storage.js';
import { renderTasks } from './ui.js';

// HTML elements
const todoForm = document.querySelector('#todo-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const clearCompletedBtn = document.querySelector('#clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');

// Update tasks, save them, and refresh the display
function updateTasks(newTasks) {
  setTasks(newTasks);
  saveTasks(newTasks);
  renderTasks(tasks, currentFilter);
}

// Display tasks when the app first loads
renderTasks(tasks, currentFilter);

// Add a task
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTasks = addTask(tasks, taskInput.value);

  if (newTasks === tasks) {
    return;
  }

  updateTasks(newTasks);
  taskInput.value = '';
});

// Change filters
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setFilter(button.dataset.filter);

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove('active');
    });

    button.classList.add('active');
    renderTasks(tasks, currentFilter);
  });
});

// Delete or complete tasks
taskList.addEventListener('click', (event) => {
  const taskItem = event.target.closest('li');

  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);

  if (event.target.classList.contains('delete-btn')) {
    updateTasks(deleteTask(tasks, taskId));
  } else if (event.target.classList.contains('task-text')) {
    updateTasks(toggleTask(tasks, taskId));
  }
});

// Edit a task by double-clicking it
taskList.addEventListener('dblclick', (event) => {
  if (!event.target.classList.contains('task-text')) return;

  const taskItem = event.target.closest('li');
  const taskId = Number(taskItem.dataset.id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) return;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = task.text;

  taskItem.replaceChild(editInput, event.target);
  editInput.focus();

  let isEditing = true;

function saveEdit() {
  if (!isEditing) return;

  isEditing = false;
  updateTasks(editTask(tasks, taskId, editInput.value));
}

function cancelEdit() {
  if (!isEditing) return;

  isEditing = false;
  renderTasks(tasks, currentFilter);
}

editInput.addEventListener('keydown', (keyEvent) => {
  if (keyEvent.key === 'Enter') saveEdit();
  if (keyEvent.key === 'Escape') cancelEdit();
});

editInput.addEventListener('blur', saveEdit);
});

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
  updateTasks(clearCompletedTasks(tasks));
});
