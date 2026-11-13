
// Add a new task
export function addTask(tasks, text, id = Date.now()) {
  const taskText = text.trim();

  if (!taskText) {
    return tasks;
  }

  const newTask = {
    id,
    text: taskText,
    completed: false,
  };

  return [...tasks, newTask];
}

// Delete a task
export function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

// Toggle task completion
export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task,
  );
}

// Edit a task
export function editTask(tasks, id, newText) {
  const text = newText.trim();

  if (!text) {
    return tasks;
  }

  return tasks.map((task) =>
    task.id === id
      ? { ...task, text }
      : task,
  );
}

// Clear completed tasks
export function clearCompletedTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}

// Filter tasks
export function filterTasks(tasks, filter) {
  if (filter === 'active') {
    return tasks.filter((task) => !task.completed);
  }

  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

// Count remaining tasks
export function countActiveTasks(tasks) {
  return tasks.filter((task) => !task.completed).length;
}
