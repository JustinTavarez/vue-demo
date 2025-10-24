/**
 * TaskController
 * Acts as the middleman between TaskStore (Model) and Vue Components (View)
 * Handles user input and orchestrates updates to the Model
 * Part of the Controller layer in MVC architecture
 */

export class TaskController {
  constructor(taskStore) {
    this.taskStore = taskStore;
    this.listeners = [];
  }

  /**
   * Subscribe to model changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notify all listeners of model changes
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Handle adding a new task
   * Called when user submits a new task
   */
  handleAddTask(taskText) {
    if (!taskText || !taskText.trim()) {
      return null;
    }

    const task = this.taskStore.addTask(taskText);
    this.notifyListeners();
    return task;
  }

  /**
   * Handle deleting a task
   * Called when user clicks delete button
   */
  handleDeleteTask(taskId) {
    this.taskStore.removeTask(taskId);
    this.notifyListeners();
  }

  /**
   * Handle toggling task completion status
   * Called when user clicks checkbox
   */
  handleToggleTask(taskId) {
    const task = this.taskStore.getTask(taskId);
    if (task) {
      task.toggleDone();
      this.taskStore.saveToLocalStorage();
      this.notifyListeners();
    }
  }

  /**
   * Get all tasks for display
   * Called by View to render tasks
   */
  getAllTasks() {
    return this.taskStore.getAllTasks();
  }

  /**
   * Get task statistics
   * Called by View to display stats
   */
  getTaskStats() {
    return {
      total: this.taskStore.getTotalCount(),
      completed: this.taskStore.getCompletedCount(),
      remaining: this.taskStore.getRemainingCount()
    };
  }

  /**
   * Handle clearing all tasks
   * Called when user confirms clear all
   */
  handleClearAllTasks() {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      this.taskStore.clearAll();
      this.notifyListeners();
      return true;
    }
    return false;
  }

  /**
   * Get filtered tasks
   * Called by View for filtering
   */
  getFilteredTasks(filter = 'all') {
    const tasks = this.taskStore.getAllTasks();
    
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.done);
      case 'completed':
        return tasks.filter(task => task.done);
      default:
        return tasks;
    }
  }
}
