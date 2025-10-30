/**
 * Main Application File
 * Simplified: Only includes task management, removing user and about sections.
 */

// Import Models
import { TaskStore } from './models/Task.js';

// Import Controllers
import { TaskController } from './controllers/TaskController.js';

// Import Vue Components (Views)
import { TaskManager, TaskItem } from './views/components.js';

// Initialize Model (Data layer)
const taskStore = new TaskStore();

// Initialize Controller (Middleman layer)
const taskController = new TaskController(taskStore);

// Create and configure Vue App
const app = window.Vue.createApp({
  template: `
    <header>
      <h1>Vue.js + MVC Architecture Demo</h1>
      <p>Separation of Concerns: Model • View • Controller</p>
    </header>

    <component 
      :is="TaskManager"
      :controller="taskController"
    />
  `,
  setup() {
    return { TaskManager, taskController };
  }
});

// Register components globally
app.component('TaskManager', TaskManager);
app.component('TaskItem', TaskItem);

// Mount the app
app.mount('#app');

// Export for testing/external use
export { app, taskController, taskStore };
