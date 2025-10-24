/**
 * UserController
 * Acts as the middleman between UserStore (Model) and Vue Components (View)
 * Handles user input and orchestrates updates to the Model
 * Part of the Controller layer in MVC architecture
 */

export class UserController {
  constructor(userStore) {
    this.userStore = userStore;
    this.listeners = [];
  }

  /**
   * Subscribe to model changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notify all listeners of model changes
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Handle adding a new user
   * Called when user submits a new user form
   */
  handleAddUser(name, email, role, avatar) {
    if (!name || !email || !role || !avatar) {
      return null;
    }

    const user = this.userStore.addUser(name, email, role, avatar);
    
    if (user) {
      this.notifyListeners();
      return user;
    }
    
    return null;
  }

  /**
   * Handle deleting a user
   * Called when user clicks delete button
   */
  handleDeleteUser(userId) {
    this.userStore.removeUser(userId);
    this.notifyListeners();
  }

  /**
   * Handle updating a user
   * Called when user edits user information
   */
  handleUpdateUser(userId, name, email, role) {
    const user = this.userStore.getUser(userId);
    
    if (user) {
      user.updateInfo(name, email, role);
      this.notifyListeners();
      return user;
    }
    
    return null;
  }

  /**
   * Get all users for display
   * Called by View to render users
   */
  getAllUsers() {
    return this.userStore.getAllUsers();
  }

  /**
   * Get single user by ID
   * Called by View for user detail page
   */
  getUser(userId) {
    return this.userStore.getUser(userId);
  }

  /**
   * Get users by role
   * Called by View for filtering
   */
  getUsersByRole(role) {
    return this.userStore.getUsersByRole(role);
  }

  /**
   * Get user statistics
   * Called by View to display stats
   */
  getUserStats() {
    return {
      total: this.userStore.getTotalCount(),
      developers: this.userStore.getCountByRole('Developer'),
      designers: this.userStore.getCountByRole('Designer'),
      managers: this.userStore.getCountByRole('Manager')
    };
  }

  /**
   * Get available roles
   * Called by View for role filter/selection
   */
  getAvailableRoles() {
    const users = this.userStore.getAllUsers();
    const roles = new Set(users.map(user => user.role));
    return Array.from(roles);
  }

  /**
   * Validate user email format
   * Called before adding/updating user
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
