# Task Management API

<!-- ![Task Management API](https://img.shields.io/badge/Task%20Management%20API-v1.0.0-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-16.x-blue)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-blue) -->
<!-- ![License](https://img.shields.io/badge/license-MIT-green) -->


The **Task Management API** is a RESTful API developed using Node.js, Express, and MongoDB. This API allows users to manage their tasks efficiently, providing endpoints for creating, reading, updating, and deleting tasks. It includes secure authentication using JWT (JSON Web Token) to ensure that only authorized users can access and modify tasks.

This project demonstrates proper RESTful practices, HTTP methods, status codes, and robust error handling for a task management system.

## 🚀 Features

- **User Authentication**: Register and login endpoints with JWT-based authentication.
- **Task CRUD Operations**: Create, retrieve, update, and delete tasks.
- **Task Filtering**: Retrieve tasks by ID.
- **Secure Endpoints**: All task-related endpoints are protected with JWT authentication.
- **Error Handling**: Meaningful error messages for invalid requests and edge cases.
- **Database Integration**: MongoDB for data persistence with Mongoose ODM.
- **Testing**: Unit tests for endpoints using Jest.

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Testing**: Jest


# 📘 API Documentation
**Localhost**: http://localhost:5000/api/tasks

## 1. Authentication

### Register a New User

- **URL:** `/api/register`
- **Method:** `POST`
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:**

  ```json
  {
    "username": "newUser",
    "password": "newPassword",
    "email": "newUser@example.com"
  }
  ```
- **Responses:**
    - **201 Created:** `{ "message": "User registered successfully" }`
    - **400 Bad Request:** `{ "error": "User already exists" }`

### Login

- **URL:** `/api/login`
- **Method:** `POST`
- **Request Headers:**
  - `Content-Type: application/json`
- **Request Body:**

  ```json
  {
  "username": "newUser",
  "password": "newPassword"
  }
  ```
- **Responses:**
    - **201 OK:** `{ "token": "JWT_TOKEN" }`
    - **400 Bad Request:** `{ "error": "Invalid credentials" }`  

## 2. Task Management

### Create a Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Request Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**

  ```json
  {
  "title": "Test",
  "description": "Fix the login bug",
  "status": "pending",
  "dueDate": "2023-12-31"
    }
  ```
- **Responses:**
    - **201 Created:** `{ "task": { "id": "1", "title": "Test" } }`
    - **400 Bad Request:** `{ "error": "Invalid credentials" }` 

### Get All Tasks
- **URL:** `/api/tasks`
- **Method:** `GET`
- **Request Headers:**
  - `Authorization: Bearer <token>`

- **Responses:**
    - **201 OK:** `[ { "id": "1", "title": "Test", "status": "pending" } ]`
    - **401 Unauthorized:** `{ "error": "Unauthorized access" }`                 

### Get a Task by ID
- **URL:** `/api/tasks/:id`
- **Method:** `GET`
- **Request Headers:**
  - `Authorization: Bearer <token>`

- **Responses:**
    - **201 OK:** `{ "id": "1", "title": "Test", "status": "pending" }`
    - **200 Not Found:** `{ "error": "Task not found" }`
    - **401 Unauthorized:** `{ "error": "Unauthorized access" }`                 

### Update a Task
- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Request Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**

  ```json
  {
  "title": "Updated Test",
  "description": "Fix the login bug",
  "status": "in progress",
  "dueDate": "2023-12-31"
    }
  ```
- **Responses:**
    - **200 OK:** `{ "task": { "id": "1", "title": "Updated Test" } }`
    - **404 Not Found:** `{ "error": "Task not found" }`
    - **401 Unauthorized:** `{ "error": "Unauthorized access" }`         

### Delete a Task
- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Request Headers:**
  - `Authorization: Bearer <token>`

- **Responses:**
    - **204 No Content**
    - **404 Not Found:** `{ "error": "Task not found" }`
    - **401 Unauthorized:** `{ "error": "Unauthorized access" }`

# 🛡️ Security and Best Practices

- **JWT Authentication**: Secures task-related endpoints to ensure only authenticated users can access them.
- **Input Validation**: Validates user input to avoid injection attacks.
- **Error Handling**: Provides meaningful error responses for different scenarios.
- **Environment Variables**: Stores sensitive information like database URIs and JWT secrets securely.

# 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the project**

2. **Create your feature branch:**

   ```bash
   git checkout -b feature/AmazingFeature
    ```
3. **Commit your changes:**
    ```bash
   git commit -m 'Add some AmazingFeature'
    ```
4. **Push to the branch:**
    ```bash
   git push origin feature/AmazingFeature
    ```    
5. **Open a pull request**    

## 🛠️ Future Enhancements

- Add support for task categories and priority levels.
- Implement real-time notifications for task updates.
- Integrate with front-end frameworks for a complete application.

## 💬 Contact

For any inquiries or feedback:

- **Author**: Vaishnavi Vaishnav
- **GitHub**: [vaishnavi-vaishnav](https://github.com/vaishnavi-vaishnav)
- **Email**: vaishnavivaishnav0000@gmail.com
