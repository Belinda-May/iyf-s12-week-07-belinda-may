import { loadTasks } from './storage.js';

export let tasks = loadTasks();

export let currentFilter = 'all';

export function setTasks(newTasks) {
  tasks = newTasks;
}

export function setFilter(newFilter) {
  currentFilter = newFilter;
}