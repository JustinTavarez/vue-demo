# Vue.js TO DO App: MVC Demo

This example shows how to build a simple task manager using Vue.js 3 with a clear separation between Model, View and Controller layers. The app manages a list of tasks, saves them in local storage and updates the interface when you add, complete or delete items.

## MVC Overview

- **Model:** Manages task data. It stores tasks, validates input and persists to local storage.
- **View:** Presents data and handles user interactions. Components like `TaskManager` and `TaskItem` show the task list and emit events.
- **Controller:** Mediates between model and views. It handles user actions, updates the model and passes data back to the views.

## Project Structure at a Glance

```
vue-demo/
├── index.html                HTML entry point that hosts the Vue mount point
├── package.json              Project metadata, scripts, and dependencies
├── vite.config.js            Vite build/dev configuration
├── src/                      Vue application source
│   ├── main.js               createApp(App).mount('#app')
│   ├── App.vue               Root SFC: instantiates MVC layers and renders the UI shell
│   ├── models/
│   │   └── Task.vue          Task entity + TaskStore collection logic (Model)
│   ├── controllers/
│   │   └── TaskController.vue Controller glue between store and views (Controller)
│   └── views/                Presentation components (View)
│       ├── TaskManager.vue   Page-level view + reactive bindings
│       ├── TaskItem.vue      Stateless task presenter emitting events
│       └── style.css         Shared styling imported globally
└── README.md                 Project documentation
```

## MVC Data Flow

```
[ TaskManager.vue ] --events--> [ TaskController ] --updates--> [ TaskStore ]
        ^                               |                             |
        |                               |                             |
        └----------- reactive data <----┴------------- localStorage <--┘
```

The view dispatches events (`handleAddTask`, `handleToggleTask`, `handleDeleteTask`) to the controller. The controller validates, mutates the store, and notifies subscribers. The store persists to `localStorage` and exposes task lists and stats, which flow back into Vue’s reactive rendering.

## Vue Concepts Cheat Sheet

| Vue Feature | Code Line(s) | How Vue Uses It |
| ----------- | ------------ | ---------------- |
| `createApp` | `src/main.js` lines 1-5 | Bootstraps a Vue application instance and mounts it into the DOM element with `id="app"`. |
| `<script setup>` | `src/App.vue` lines 10-17, `src/views/TaskManager.vue` lines 45-95 | Compiler macro that treats top-level declarations as part of the component’s `setup()` output, giving concise access to Composition API features. |
| `defineProps` | `src/views/TaskManager.vue` lines 49-54; `src/views/TaskItem.vue` lines 15-19 | Declares reactive props; Vue performs runtime checks and exposes them directly in the template. |
| `defineEmits` | `src/views/TaskItem.vue` line 22 | Registers custom events so Vue validates emitted event names and parent listeners. |
| `ref` | `src/views/TaskManager.vue` lines 56-58 | Creates reactive references; Vue tracks `.value` changes and re-renders consumers. |
| `computed` | `src/views/TaskManager.vue` line 59 | Produces cached, reactive getters—Vue invalidates and recomputes when dependencies change. |
| Lifecycle (`onMounted`, `onBeforeUnmount`) | `src/views/TaskManager.vue` lines 87-94 | Hooks for setup/cleanup; Vue runs them when the component enters/exits the DOM. |
| Directives (`v-model`, `v-if`, `v-else`, `v-for`, `:key`) | `src/views/TaskManager.vue` lines 4-41 | Declaratively bind inputs, conditionally render blocks, repeat lists, and optimize DOM diffing. |
| Event modifiers (`@keyup.enter`) | `src/views/TaskManager.vue` line 6 | Listens for specific key events without manual `event.key` checks. |
| `$emit` | `src/views/TaskItem.vue` lines 7 and 10 | Sends custom events upward so parents can respond to user actions. |

## Quick Start

1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the dev server.
3. Run `npm run build` to create a production build.
4. Run `npm run preview` to preview the build.

## Learning Outcomes

You will see how MVC separates data, logic and UI and how controllers mediate between the layers.
