/**
 * Main Application File
 * Ties together Models, Views, and Controllers
 * Orchestrates the entire MVC application
 */

// Import Models
import { TaskStore } from './models/Task.js';

// Import Controllers
import { TaskController } from './controllers/TaskController.js';

// Import Vue Components (Views)
import { TaskManager, TaskItem } from './views/components.js';

// Initialize Models (Data layer)
const taskStore = new TaskStore();

// Initialize Controllers (Middleman layer)
const taskController = new TaskController(taskStore);

// Create and configure Vue App
const app = window.Vue.createApp({
  template: `
    <header>
      <h1>Vue TO-DO Demo</h1>
      <p>Created by Justin Tavarez</p>
    </header>

    <TaskManager :controller="taskController" />
  `,
  setup() {
    return { taskController };
  }
});

// Register components globally
app.component('TaskManager', TaskManager);
app.component('TaskItem', TaskItem);

// Mount the app
app.mount('#app');

// Export for testing/external use
export { app, taskController, taskStore };
