/**
 * Vue Components (View Layer)
 * These components handle the presentation and user interface
 * They receive data from Controllers and emit events for user actions
 */

/**
 * TaskItem Component
 * Displays a single task with options to toggle and delete
 */
export const TaskItem = {
  props: ['task'],
  emits: ['toggle', 'delete'],
  template: `
    <li :class="['task-item', { completed: task.done }]">
      <input 
        type="checkbox" 
        class="task-checkbox"
        :checked="task.done"
        @change="$emit('toggle', task.id)"
      >
      <span class="task-text">{{ task.text }}</span>
      <button class="task-delete" @click="$emit('delete', task.id)">Delete</button>
    </li>
  `
};

/**
 * TaskManager Component
 * Main task management view
 */
export const TaskManager = {
  props: ['controller'],
  emits: [],
  template: `
    <div class="container">
      <div class="task-input">
        <input 
          v-model="newTask" 
          @keyup.enter="addTask" 
          placeholder="Add a new task..."
          type="text"
        >
        <button @click="addTask">Add Task</button>
      </div>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-number">{{ stats.total }}</div>
          <div class="stat-label">Total Tasks</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ stats.completed }}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ stats.remaining }}</div>
          <div class="stat-label">Remaining</div>
        </div>
      </div>

      <div v-if="tasks.length === 0" class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>No tasks yet. Add one to get started!</p>
      </div>

      <ul v-else class="task-list">
        <task-item 
          v-for="task in tasks" 
          :key="task.id"
          :task="task"
          @toggle="handleToggle"
          @delete="handleDelete"
        />
      </ul>
    </div>
  `,
  setup(props) {
    const { ref, computed, onMounted } = window.Vue;
    
    const newTask = ref('');
    const tasks = ref([]);
    
    const stats = computed(() => props.controller.getTaskStats());

    const addTask = () => {
      if (newTask.value.trim()) {
        props.controller.handleAddTask(newTask.value);
        newTask.value = '';
        updateTasks();
      }
    };

    const handleToggle = (taskId) => {
      props.controller.handleToggleTask(taskId);
      updateTasks();
    };

    const handleDelete = (taskId) => {
      props.controller.handleDeleteTask(taskId);
      updateTasks();
    };

    const updateTasks = () => {
      tasks.value = props.controller.getAllTasks();
    };

    const handleModelChange = () => {
      updateTasks();
    };

    onMounted(() => {
      updateTasks();
      props.controller.subscribe(handleModelChange);
    });

    return { newTask, tasks, stats, addTask, handleToggle, handleDelete };
  }
};

/**
 * UserCard Component
 * Displays a single user card
 */
export const UserCard = {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  template: `
    <div class="user-card">
      <div class="user-avatar">{{ user.avatar }}</div>
      <div class="user-name">{{ user.name }}</div>
      <div class="user-email">{{ user.email }}</div>
      <div class="user-role">{{ user.role }}</div>
    </div>
  `
};

/**
 * UserDirectory Component
 * Main user management view
 */
export const UserDirectory = {
  props: ['controller'],
  template: `
    <div class="container">
      <div class="stats">
        <div class="stat-card">
          <div class="stat-number">{{ stats.total }}</div>
          <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ stats.developers }}</div>
          <div class="stat-label">Developers</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ stats.designers }}</div>
          <div class="stat-label">Designers</div>
        </div>
      </div>

      <div class="user-grid">
        <user-card 
          v-for="user in users" 
          :key="user.id"
          :user="user"
        />
      </div>
    </div>
  `,
  setup(props) {
    const { ref, computed, onMounted } = window.Vue;
    
    const users = ref([]);
    const stats = computed(() => props.controller.getUserStats());

    const updateUsers = () => {
      users.value = props.controller.getAllUsers();
    };

    const handleModelChange = () => {
      updateUsers();
    };

    onMounted(() => {
      updateUsers();
      props.controller.subscribe(handleModelChange);
    });

    return { users, stats };
  }
};

/**
 * About Component
 * Information page about the MVC architecture
 */
export const About = {
  template: `
    <div class="container">
      <div class="about-content">
        <h2>Welcome to Vue.js + MVC Demo</h2>
        <p>This application demonstrates Vue.js combined with the MVC (Model-View-Controller) architectural pattern.</p>

        <h2>🏗️ MVC Architecture</h2>
        <ul>
          <li><strong>Model:</strong> Task.js, User.js, TaskStore, UserStore - Handle data and business logic</li>
          <li><strong>View:</strong> Vue components - Present data and handle UI interactions</li>
          <li><strong>Controller:</strong> TaskController.js, UserController.js - Mediate between Model and View</li>
        </ul>

        <h2>🎯 Key Concepts</h2>
        <ul>
          <li><strong>Separation of Concerns:</strong> Each layer has a specific responsibility</li>
          <li><strong>Reactive Data:</strong> Vue automatically updates UI when data changes</li>
          <li><strong>Reusable Components:</strong> Components can be used multiple times with different data via props</li>
          <li><strong>Event-Driven:</strong> Controllers and Views communicate through events</li>
          <li><strong>Business Logic Isolation:</strong> Models contain all business rules and data validation</li>
        </ul>

        <h2>📁 Project Structure</h2>
        <div class="code-block">
/models
  ├── Task.js          (Task class & TaskStore)
  └── User.js          (User class & UserStore)

/controllers
  ├── TaskController.js (Handles task operations)
  └── UserController.js (Handles user operations)

/views
  └── components.js    (Vue components)

/app.js               (Main application file)
index.html            (HTML entry point)
        </div>

        <h2>💡 Data Flow in MVC</h2>
        <div class="code-block">
User Interaction (View)
         ↓
    Controller
         ↓
    Model (Update Data)
         ↓
    Controller (Notify)
         ↓
    View (Re-render)
        </div>

        <h2>✨ Benefits of MVC</h2>
        <ul>
          <li>Easy to test - each layer can be tested independently</li>
          <li>Easy to maintain - changes in one layer don't affect others</li>
          <li>Easy to scale - add new features without breaking existing code</li>
          <li>Clear responsibility - each file has a clear purpose</li>
          <li>Reusable components - controllers and models can be used by different views</li>
        </ul>

        <h2>🚀 How to Use</h2>
        <ul>
          <li>Visit the <strong>Tasks</strong> tab to manage your to-do items</li>
          <li>Visit the <strong>Users</strong> tab to view team members</li>
          <li>All data is persisted using localStorage</li>
          <li>Inspect the code to see how MVC is implemented</li>
        </ul>
      </div>
    </div>
  `
};
