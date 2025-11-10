# Vue.js TO DO App: MVC Demo

This example shows how to build a simple task manager using Vue.js 3 with a clear separation between Model, View and Controller layers. The app manages a list of tasks, saves them in local storage and updates the interface when you add, complete or delete items.

## MVC Overview

- **Model:** Manages task data. It stores tasks, validates input and persists to local storage.
- **View:** Presents data and handles user interactions. Components like `TaskManager` and `TaskItem` show the task list and emit events.
- **Controller:** Mediates between model and views. It handles user actions, updates the model and passes data back to the views.

## Project Structure

```
vue-demo/
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Build configuration
├── src/
│   ├── App.vue            # Root component
│   ├── main.js            # Bootstraps the app
│   ├── models/
│   │   └── Task.vue       # Task and TaskStore classes
│   ├── controllers/
│   │   └── TaskController.vue  # Handles task actions
│   ├── views/
│   │   ├── TaskManager.vue    # Main task interface
│   │   ├── TaskItem.vue       # Single task item
│   │   └── style.css          # Styles
└── README.md

```

## Quick Start

1. Run `npm install` to install dependencies.
2. Run `npm run dev` to start the dev server.
3. Run `npm run build` to create a production build.
4. Run `npm run preview` to preview the build.

## Learning Outcomes

You will see how MVC separates data, logic and UI and how controllers mediate between the layers.
