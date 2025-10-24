# Vue.js + MVC Architecture Demo

A comprehensive demonstration of the **Model-View-Controller (MVC)** architectural pattern implemented with Vue.js 3. This project showcases how to organize a web application into three distinct layers: Models (data & business logic), Views (user interface), and Controllers (application logic).

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
- **Example:** Vue components like `TaskManager` and `UserDirectory`

### Controller
- **Responsibility:** Acts as the middleman between Model and View
- **What it does:** Receives user input from View, updates Model accordingly, instructs View what to render
- **Who accesses it:** Connects Models and Views together
- **Example:** `TaskController` that coordinates between `TaskStore` and `TaskManager`

## 🚀 Data Flow in MVC

```
┌─────────────────────────────────────────────────────────────┐
│                     Data Flow Diagram                         │
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
```

## 📁 Project Structure

```
vue-demo/
├── models/
│   ├── Task.js              # Task class & TaskStore
│   └── User.js              # User class & UserStore
├── controllers/
│   ├── TaskController.js    # Handles task operations
│   └── UserController.js    # Handles user operations
├── views/
│   └── components.js        # Vue components (TaskManager, UserDirectory, etc.)
├── app.js                   # Main app file - ties everything together
├── index.html               # HTML entry point
└── README.md               # This file
```

## 📦 Models Layer

### What Models Do
- Define the structure of data (classes)
- Implement business logic and validation
- Handle data persistence (localStorage)
- Provide methods to query and manipulate data

### Task Model (`models/Task.js`)

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

### User Model (`models/User.js`)

```javascript
// Individual user object
class User {
  constructor(id, name, email, role, avatar)
  updateInfo(name, email, role)  // Update user details
  getDisplayName()                // Get formatted name
  isValidEmail()                  // Email validation
  toJSON()                        // Convert to JSON
}

// Collection manager
class UserStore {
  addUser(name, email, role, avatar)     // Create new user
  removeUser(userId)                     // Delete user
  getAllUsers()                          // Retrieve all users
  getUsersByRole(role)                   // Filter by role
  getCountByRole(role)                   // Count by role
}
```

## 🎮 Controllers Layer

### What Controllers Do
- Listen to user input from Views
- Call Model methods to update data
- Provide data to Views for rendering
- Notify Views when Model changes

### TaskController (`controllers/TaskController.js`)

```javascript
class TaskController {
  // Handle user actions
  handleAddTask(taskText)         // User adds new task
  handleDeleteTask(taskId)        // User deletes task
  handleToggleTask(taskId)        // User marks task done/undone
  handleClearAllTasks()           // User clears all tasks

  // Provide data to View
  getAllTasks()                   // Get tasks for rendering
  getTaskStats()                  // Get statistics
  getFilteredTasks(filter)        // Get filtered task list

  // Notify system
  subscribe(listener)             // Register for updates
  notifyListeners()               // Tell Views about changes
}
```

### UserController (`controllers/UserController.js`)

```javascript
class UserController {
  // Handle user actions
  handleAddUser(name, email, role, avatar)
  handleDeleteUser(userId)
  handleUpdateUser(userId, name, email, role)

  // Provide data to View
  getAllUsers()                   // Get all users
  getUser(userId)                 // Get single user
  getUsersByRole(role)            // Filter by role
  getUserStats()                  // Get statistics

  // Validation
  validateEmail(email)            // Email format validation
}
```

## 🎨 Views Layer

### What Views Do
- Display data from Controllers
- Handle user interactions (clicks, typing, etc.)
- Emit events when users interact
- Stay reactive - update automatically when data changes

### Vue Components (`views/components.js`)

#### TaskManager Component
- Displays task input form
- Shows task statistics (total, completed, remaining)
- Lists all tasks using TaskItem component
- Handles add, toggle, and delete events

#### TaskItem Component
- Reusable component for individual tasks
- Shows task text, checkbox, and delete button
- Emits events back to parent component

#### UserDirectory Component
- Displays user statistics
- Grid layout of users
- Each user shown as UserCard component

#### UserCard Component
- Reusable component for individual users
- Shows avatar, name, email, and role
- Interactive hover effects

#### About Component
- Educational page explaining MVC
- Shows project structure
- Describes data flow and benefits

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

## 🚀 Quick Start

### Method 1: Direct File Access
```bash
open /Users/justintavarez/Documents/VSC_Software_Dev_Work/vue-demo/index.html
```

### Method 2: Python HTTP Server
```bash
cd /Users/justintavarez/Documents/VSC_Software_Dev_Work/vue-demo
python3 -m http.server 5173
# Then open: http://localhost:5173
```

### Method 3: Node.js HTTP Server
```bash
cd /Users/justintavarez/Documents/VSC_Software_Dev_Work/vue-demo
npx http-server -p 5173
# Then open: http://localhost:5173
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

### `models/Task.js`
Defines Task data model and TaskStore for managing a collection of tasks. Handles localStorage persistence and all task-related business logic.

### `models/User.js`
Defines User data model and UserStore for managing a collection of users. Includes email validation and role-based queries.

### `controllers/TaskController.js`
Mediates between TaskStore (Model) and TaskManager (View). Handles all user interactions with tasks and notifies View of changes.

### `controllers/UserController.js`
Mediates between UserStore (Model) and UserDirectory (View). Handles user management operations and provides statistics.

### `views/components.js`
Contains all Vue components (TaskManager, TaskItem, UserDirectory, UserCard, About). These are the UI layer of the MVC architecture.

### `app.js`
Main application file. Instantiates models and controllers, configures Vue, and orchestrates the entire application.

### `index.html`
HTML entry point. Includes Vue.js from CDN, loads styles, and imports app.js module.

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

## 📝 License

MIT License - Feel free to use and modify this project for educational purposes.

---

**Happy Learning!** 🎉 Explore the code, experiment with modifications, and master MVC architecture with Vue.js. 
