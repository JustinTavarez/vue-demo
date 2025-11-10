<script>
/**
 * Task Model
 * Handles all task data and business logic
 * Part of the Model layer in MVC architecture
 */

export class Task {
  constructor(text, done = false) {
    this.text = text;
    this.done = done;
    this.createdAt = new Date();
    this.id = Math.random().toString(36).substr(2, 9);
  }

  /**
   * Toggle the done status of a task
   */
  toggleDone() {
    this.done = !this.done;
  }

  /**
   * Update task text
   */
  updateText(newText) {
    if (newText.trim()) {
      this.text = newText.trim();
      return true;
    }
    return false;
  }

  /**
   * Convert task to JSON
   */
  toJSON() {
    return {
      id: this.id,
      text: this.text,
      done: this.done,
      createdAt: this.createdAt
    };
  }
}

/**
 * TaskStore - Manages a collection of tasks
 * Handles persistence and querying of tasks
 */
export class TaskStore {
  constructor() {
    this.tasks = [];
    this.loadFromLocalStorage();
  }

  /**
   * Add a new task
   */
  addTask(taskText) {
    const task = new Task(taskText);
    this.tasks.push(task);
    this.saveToLocalStorage();
    return task;
  }

  /**
   * Remove a task by ID
   */
  removeTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveToLocalStorage();
  }

  /**
   * Get task by ID
   */
  getTask(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }

  /**
   * Get all tasks
   */
  getAllTasks() {
    return [...this.tasks];
  }

  /**
   * Get count of completed tasks
   */
  getCompletedCount() {
    return this.tasks.filter(task => task.done).length;
  }

  /**
   * Get count of remaining tasks
   */
  getRemainingCount() {
    return this.tasks.filter(task => !task.done).length;
  }

  /**
   * Get total task count
   */
  getTotalCount() {
    return this.tasks.length;
  }

  /**
   * Save tasks to localStorage
   */
  saveToLocalStorage() {
    try {
      const data = this.tasks.map(task => task.toJSON());
      localStorage.setItem('tasks', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  /**
   * Load tasks from localStorage
   */
  loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('tasks');
      if (data) {
        const parsed = JSON.parse(data);
        this.tasks = parsed.map(item => {
          const task = new Task(item.text, item.done);
          task.id = item.id;
          task.createdAt = new Date(item.createdAt);
          return task;
        });
      } else {
        this.initializeDefaultTasks();
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      this.initializeDefaultTasks();
    }
  }

  /**
   * Initialize with default tasks if localStorage is empty
   */
  initializeDefaultTasks() {
    this.tasks = [
      new Task('Learn Vue.js components', false),
      new Task('Master props and reactivity', true),
      new Task('Build a routing example', false),
      new Task('Understand MVC architecture', false)
    ];
    this.saveToLocalStorage();
  }

  /**
   * Clear all tasks
   */
  clearAll() {
    this.tasks = [];
    this.saveToLocalStorage();
  }
}

export default {};
</script>

