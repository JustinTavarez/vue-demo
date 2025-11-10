# Vue.js TO-DO App - MVC Architecture Demo

A clean demonstration of the **Model-View-Controller (MVC)** architectural pattern implemented with Vue.js 3. This task management application showcases how to organize a web application into three distinct layers: Models (data & business logic), Views (user interface), and Controllers (application logic).

## 🏗️ What is MVC?

### Model
- **Responsibility:** Manages data and business logic
- **What it does:** Stores information, validates data, performs calculations, handles persistence
- **Who accesses it:** Controllers request data from models
- **Example:** `TaskStore` class that manages all task data and operations

### View
- **Responsibility:** Presents data to the user through the UI
- **What it does:** Renders HTML, handles user interactions, displays model data
- **Who accesses it:** Receives data from controllers through props
- **Example:** Vue components like `TaskManager` and `TaskItem`

### Controller
- **Responsibility:** Acts as the middleman between Model and View
- **What it does:** Receives user input from View, updates Model accordingly, instructs View what to render
- **Who accesses it:** Connects Models and Views together
- **Example:** `TaskController` that coordinates between `TaskStore` and `TaskManager`

## 🚀 Data Flow in MVC

┌─────────────────────────────────────────────────────────────┐
│                     Data Flow Diagram                       │
└─────────────────────────────────────────────────────────────┘

User Interaction (clicks button, types text, etc.)
                      ↓
                   VIEW (Vue Component)
                      ↓
           CONTROLLER (Handles event)
                      ↓
            MODEL (Update data/state)
                      ↓
         CONTROLLER (Notify listeners)
                      ↓
            VIEW (Re-render with new data)

## 📁 Project Structure

vue-demo/
├── index.html               # Vite entry HTML
├── package.json             # Project metadata & scripts
├── vite.config.js           # Vite configuration
├── src/
│   ├── App.vue              # Root Vue component
│   ├── main.js              # Application bootstrap with Vite
│   ├── models/
│   │   └── Task.vue         # Task class & TaskStore
│   ├── controllers/
│   │   └── TaskController.vue # Handles task operations
│   └── views/
│       ├── TaskManager.vue  # Main task management view
│       ├── TaskItem.vue     # Task list item
│       └── style.css        # Styling
└── README.md                # This file

## 📦 Models Layer

### What Models Do
- Define the structure of data (classes)
- Implement business logic and validation
- Handle data persistence (localStorage)
- Provide methods to query and manipulate data

### Task Model (`src/models/Task.vue`)

```javascript
// Individual task object
class Task {
  constructor(text, done = false)
  toggleDone()                    // Toggle completion status
  updateText(newText)             // Update task description
  toJSON()                        // Convert to JSON
}

// Collection manager
class TaskStore {
  addTask(taskText)               // Create new task
  removeTask(taskId)              // Delete task
  getAllTasks()                   // Retrieve all tasks
  getCompletedCount()             // Get count of done tasks
  getRemainingCount()             // Get count of undone tasks
  saveToLocalStorage()            // Persist to browser storage
  loadFromLocalStorage()          // Load from browser storage
}
```

## 🎮 Controllers Layer

### What Controllers Do
- Listen to user input from Views
- Call Model methods to update data
- Provide data to Views for rendering
- Notify Views when Model changes

### TaskController (`src/controllers/TaskController.vue`)

```javascript
class TaskController {
  // Handle user actions
  handleAddTask(taskText)         // User adds new task
  handleDeleteTask(taskId)        // User deletes task
  handleToggleTask(taskId)        // User marks task done/undone
  handleClearAllTasks()           // User clears all tasks

  // Provide data to View
  getAllTasks()                   // Get tasks for rendering
  getTaskStats()                  // Get statistics (total, completed, remaining)
  getFilteredTasks(filter)        // Get filtered task list

  // Notify system
  subscribe(listener)             // Register for updates
  unsubscribe(listener)           // Remove listener when view unmounts
  notifyListeners()               // Tell Views about changes
}
```

## 🎨 Views Layer

### What Views Do
- Display data from Controllers
- Handle user interactions (clicks, typing, etc.)
- Emit events when users interact
- Stay reactive - update automatically when data changes

### Vue Components (`src/views/TaskManager.vue`, `src/views/TaskItem.vue`)

#### TaskManager Component
- Displays task input form
- Shows task statistics (total, completed, remaining)
- Lists all tasks using `TaskItem` component
- Handles add, toggle, and delete events via the controller

#### TaskItem Component
- Reusable component for individual tasks
- Shows task text, checkbox, and delete button
- Emits events back to parent component
- Provides visual feedback for completed tasks

## 🔄 How Everything Works Together

### Example: Adding a Task

```
1. USER: Types task text and clicks "Add Task" button
                            ↓
2. VIEW: TaskManager captures click event
                            ↓
3. VIEW: Calls controller.handleAddTask(taskText)
                            ↓
4. CONTROLLER: Validates input and calls taskStore.addTask()
                            ↓
5. MODEL: Task created, stored in array, saved to localStorage
                            ↓
6. CONTROLLER: Calls notifyListeners()
                            ↓
7. VIEW: Model change detected, calls updateTasks()
                            ↓
8. VIEW: Re-renders with new task in list
```

### Example: Toggling Task Completion

```
1. USER: Clicks checkbox on task
                            ↓
2. VIEW: TaskItem emits toggle event with task ID
                            ↓
3. VIEW: Parent calls controller.handleToggleTask(taskId)
                            ↓
4. CONTROLLER: Finds task in model and calls task.toggleDone()
                            ↓
5. MODEL: Task.done flipped (true/false)
                            ↓
6. CONTROLLER: Notifies all listeners
                            ↓
7. VIEW: Detects change and re-renders
                            ↓
8. UI: Task visual state updated (strikethrough, color change)
```

## 🚀 Quick Start (Vite)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Dev Server
```bash
npm run dev
# Vite will print a local URL (default: http://localhost:5173)
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview the Production Build
```bash
npm run preview
```

## 💡 Key Benefits of MVC

### ✅ Separation of Concerns
- Each layer has a specific responsibility
- Changes in one layer don't break others
- Easy to understand the code structure

### ✅ Testability
- Models can be tested independently (no UI needed)
- Controllers can be tested with mock data
- Views can be tested with different data scenarios

### ✅ Maintainability
- Bug fixes are localized to specific layers
- Adding features is straightforward
- Refactoring is safer and easier

### ✅ Scalability
- Can easily add more models and controllers
- Multiple views can use the same controller
- Code reuse is maximized

### ✅ Team Collaboration
- Different developers can work on different layers
- Clear interfaces between components
- Less merge conflicts

## 📚 File Descriptions

### `src/models/Task.vue`
Defines Task data model and TaskStore for managing a collection of tasks. Handles localStorage persistence and all task-related business logic.

### `src/controllers/TaskController.vue`
Mediates between TaskStore (Model) and TaskManager (View). Handles all user interactions with tasks and notifies View of changes.

### `src/views/TaskManager.vue`
Main task management view that handles input, renders stats, and lists all tasks. Communicates with the controller through props.

### `src/views/TaskItem.vue`
Reusable component for individual tasks with toggle and delete actions.

### `src/views/style.css`
Stylesheet with modern CSS including gradients, animations, and responsive design for the task management interface.

### `src/App.vue` & `src/main.js`
Root Vue component and entry file that instantiate the model, controller, and mount the application via Vite.

### `index.html`
HTML entry point used by Vite to bootstrap the bundled application.

## 🎯 Learning Outcomes

After exploring this project, you'll understand:

1. **How MVC separates code** into logical layers
2. **How Models manage data** independently from UI
3. **How Views display data** without business logic
4. **How Controllers coordinate** between Model and View
5. **How Vue components** fit into MVC architecture
6. **How to design scalable applications** that are easy to maintain

## 🔧 Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Composition API** - Vue's modern API for building components
- **Vite** - Lightning-fast dev server & build tool
- **ES6 Modules** - Code organization and imports
- **localStorage** - Browser storage for persistence
- **CSS3** - Modern styling with gradients and animations
- **HTML5** - Semantic markup

## 📖 Resources

- [Vue.js Official Documentation](https://vuejs.org/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [MVC Architecture Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [Design Patterns](https://refactoring.guru/design-patterns)

## 💻 Browser Compatibility

- Chrome/Edge 51+
- Firefox 54+
- Safari 10+
- Opera 38+

## 🎨 Features

-  Add new tasks
-  Mark tasks as complete/incomplete
-  Delete tasks
-  View task statistics (total, completed, remaining)
-  Data persistence with localStorage
-  Beautiful, modern UI design
-  Responsive layout

**Happy Learning!** 🎉 Explore the code, experiment with modifications, and master MVC architecture with Vue.js.
