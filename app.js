/**
 * Main Application File
 * Ties together Models, Views, and Controllers
 * Orchestrates the entire MVC application
 */

// Import Models
import { TaskStore } from './models/Task.js';
import { UserStore } from './models/User.js';

// Import Controllers
import { TaskController } from './controllers/TaskController.js';
import { UserController } from './controllers/UserController.js';

// Import Vue Components (Views)
import { TaskManager, UserDirectory, About, TaskItem, UserCard } from './views/components.js';

// Initialize Models (Data layer)
const taskStore = new TaskStore();
const userStore = new UserStore();

// Initialize Controllers (Middleman layer)
const taskController = new TaskController(taskStore);
const userController = new UserController(userStore);

// Create and configure Vue App
const app = window.Vue.createApp({
  template: `
    <header>
      <h1>Vue.js + MVC Architecture Demo</h1>
      <p>Separation of Concerns: Model • View • Controller</p>
    </header>

    <nav>
      <a 
        :class="{ active: currentPage === 'tasks' }"
        @click="navigateTo('tasks')"
      >📋 Tasks</a>
      <a 
        :class="{ active: currentPage === 'users' }"
        @click="navigateTo('users')"
      >👥 Users</a>
      <a 
        :class="{ active: currentPage === 'about' }"
        @click="navigateTo('about')"
      >ℹ️ About</a>
    </nav>

    <component 
      :is="currentComponent"
      :controller="currentController"
    />
  `,
  setup() {
    const { ref, computed } = window.Vue;
    
    const currentPage = ref('tasks');

    const currentComponent = computed(() => {
      const pages = {
        tasks: TaskManager,
        users: UserDirectory,
        about: About
      };
      return pages[currentPage.value];
    });

    const currentController = computed(() => {
      const controllers = {
        tasks: taskController,
        users: userController,
        about: null
      };
      return controllers[currentPage.value];
    });

    const navigateTo = (page) => {
      currentPage.value = page;
      window.location.hash = `#${page}`;
    };

    // Support browser back/forward buttons
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'tasks';
      if (['tasks', 'users', 'about'].includes(hash)) {
        currentPage.value = hash;
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Set initial page from URL hash
    const initialHash = window.location.hash.slice(1) || 'tasks';
    if (['tasks', 'users', 'about'].includes(initialHash)) {
      currentPage.value = initialHash;
    }

    return { currentPage, currentComponent, currentController, navigateTo };
  }
});

// Register components globally
app.component('TaskManager', TaskManager);
app.component('UserDirectory', UserDirectory);
app.component('About', About);
app.component('TaskItem', TaskItem);
app.component('UserCard', UserCard);

// Mount the app
app.mount('#app');

// Export for testing/external use
export { app, taskController, userController, taskStore, userStore };
