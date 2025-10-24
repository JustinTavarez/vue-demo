/**
 * User Model
 * Handles all user data and business logic
 * Part of the Model layer in MVC architecture
 */

export class User {
  constructor(id, name, email, role, avatar) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
    this.createdAt = new Date();
  }

  /**
   * Update user information
   */
  updateInfo(name, email, role) {
    if (name && name.trim()) this.name = name.trim();
    if (email && email.trim()) this.email = email.trim();
    if (role && role.trim()) this.role = role.trim();
  }

  /**
   * Get user display name
   */
  getDisplayName() {
    return this.name || 'Anonymous';
  }

  /**
   * Validate email format
   */
  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  /**
   * Convert user to JSON
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      createdAt: this.createdAt
    };
  }
}

/**
 * UserStore - Manages a collection of users
 * Handles persistence and querying of users
 */
export class UserStore {
  constructor() {
    this.users = [];
    this.initializeDefaultUsers();
  }

  /**
   * Add a new user
   */
  addUser(name, email, role, avatar) {
    const user = new User(this.generateId(), name, email, role, avatar);
    if (user.isValidEmail()) {
      this.users.push(user);
      return user;
    }
    return null;
  }

  /**
   * Remove a user by ID
   */
  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  /**
   * Get user by ID
   */
  getUser(userId) {
    return this.users.find(user => user.id === userId);
  }

  /**
   * Get all users
   */
  getAllUsers() {
    return [...this.users];
  }

  /**
   * Get users by role
   */
  getUsersByRole(role) {
    return this.users.filter(user => user.role === role);
  }

  /**
   * Get total user count
   */
  getTotalCount() {
    return this.users.length;
  }

  /**
   * Get count by role
   */
  getCountByRole(role) {
    return this.users.filter(user => user.role === role).length;
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return Math.max(...this.users.map(u => u.id), 0) + 1;
  }

  /**
   * Initialize with default users
   */
  initializeDefaultUsers() {
    this.users = [
      new User(1, 'Alice Johnson', 'alice@example.com', 'Developer', 'A'),
      new User(2, 'Bob Smith', 'bob@example.com', 'Designer', 'B'),
      new User(3, 'Carol White', 'carol@example.com', 'Manager', 'C'),
      new User(4, 'David Brown', 'david@example.com', 'Developer', 'D'),
      new User(5, 'Eve Wilson', 'eve@example.com', 'Developer', 'E')
    ];
  }

  /**
   * Clear all users
   */
  clearAll() {
    this.users = [];
  }
}
