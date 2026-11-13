
import { describe, it, expect } from 'vitest';

import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  clearCompletedTasks,
  filterTasks,
  countActiveTasks,
} from '../js/todo-logic.js';

// Sample tasks for testing
const sampleTasks = [
  { id: 1, text: 'Learn JavaScript', completed: false },
  { id: 2, text: 'Practice Git', completed: true },
  { id: 3, text: 'Build a project', completed: false },
];

describe('To-Do List Logic', () => {

  it('should add a new task', () => {
    const result = addTask(sampleTasks, 'Learn testing', 4);

    expect(result).toHaveLength(4);
    expect(result[3].text).toBe('Learn testing');
  });

  it('should not add an empty task (edge case)', () => {
    const result = addTask(sampleTasks, '   ');

    expect(result).toHaveLength(3);
  });

  it('should delete a task', () => {
    const result = deleteTask(sampleTasks, 1);

    expect(result).toHaveLength(2);
    expect(result.some((task) => task.id === 1)).toBe(false);
  });

  it('should toggle task completion', () => {
    const result = toggleTask(sampleTasks, 1);

    expect(result[0].completed).toBe(true);
  });

  it('should not modify the original array', () => {
    const original = structuredClone(sampleTasks);

    const result = toggleTask(sampleTasks, 1);

    expect(sampleTasks).toEqual(original);
    expect(result).not.toBe(sampleTasks);
  });

  it('should edit a task', () => {
    const result = editTask(sampleTasks, 1, 'Learn testing');

    expect(result[0].text).toBe('Learn testing');
  });

  it('should clear completed tasks', () => {
    const result = clearCompletedTasks(sampleTasks);

    expect(result).toHaveLength(2);
    expect(result.every((task) => !task.completed)).toBe(true);
  });

  it('should filter active tasks', () => {
    const result = filterTasks(sampleTasks, 'active');

    expect(result).toHaveLength(2);
  });

  it('should count active tasks', () => {
    expect(countActiveTasks(sampleTasks)).toBe(2);
  });

});
