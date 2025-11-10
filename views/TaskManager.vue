<template>
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
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="handleToggle"
        @delete="handleDelete"
      />
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import TaskItem from './TaskItem.vue';

export default {
  props: {
    controller: Object
  },
  components: {
    TaskItem
  },
  setup(props) {
    const newTask = ref('');
    const tasks = ref([]);
    const stats = computed(() => props.controller.getTaskStats());

    const updateTasks = () => {
      tasks.value = props.controller.getAllTasks();
    };

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
</script>
