<template>
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
</template>

<script>
export default {
  props: {
    task: { type: Object, required: true }
  },
  emits: ['toggle', 'delete']
};
</script>
