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
