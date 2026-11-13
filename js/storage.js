const STORAGE_KEY = 'todo-tasks';

// Save tasks to localStorage
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Unable to save tasks:', error);
  }
}

// Retrieve tasks from localStorage
export function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    const tasks = JSON.parse(savedTasks);

    if (!Array.isArray(tasks)) {
      return [];
    }

    return tasks;
  } catch {
    return [];
  }
}