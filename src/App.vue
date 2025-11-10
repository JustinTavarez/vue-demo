<template>
  <header>
    <h1>Vue TO-DO Demo</h1>
    <p>Created by Justin Tavarez</p>
  </header>

  <TaskManager :controller="taskController" />
</template>

<script setup>
import TaskManager from './views/TaskManager.vue';
import { TaskStore } from './models/Task.vue';
import { TaskController } from './controllers/TaskController.vue';

const taskStore = new TaskStore();
const taskController = new TaskController(taskStore);
</script>

