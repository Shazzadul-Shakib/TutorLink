# **📚 Blog-project-app API**

---

## **🚀 Live URL**

Visit the live application: [Blog-project-app API](https://blog-project-assignment.vercel.app)

---

## **📖 Table of Contents**

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [API Documentation](#api-documentation)

---

## **💡 About the Project**

The **Blog-project-app** is secure, role-based blogging platform backend enabling users to manage their blogs and admins to oversee users, with a public API for viewing, searching, sorting, and filtering blogs.

---

## **✨ Features**

- **CRUD Operations**:

  - Create, update, delete, and fetch blogs.
  - Admins can manage users and their blogs.

- **Role-Based Access Control**:

  - Secure role-based permissions for Admin and User functionalities.

- **Authentication and Authorization**:

  - Secure login system with token-based authentication and role-based access control.

- **Public API**:

  - Open API for browsing blogs with search, sort, and filter options.

- **Search, Sort, and Filter**:

  - Search blogs by title, author, or tags.
  - Sort blogs by date, popularity, or relevance.
  - Filter blogs by categories, authors, or date range.

- **Validation and Error Handling**:

  - Robust validation for inputs like blog content, user data, and access permissions.
  - Friendly error responses for invalid inputs and unauthorized actions.

- **Modern Development Practices**:
  - Modular architecture for scalability and maintainability.
  - Clean and reusable code adhering to best practices.

---

## **🛠 Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Validation**: Zod Validations
- **Others**: TypeScript for type safety and better developer experience

---

## **⚙️ Setup and Installation**

Follow these steps to set up the application on your local machine:

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (local or cloud database)
- npm (comes with Node.js)

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Shazzadul-Shakib/Blog-project-assignment
   cd Blog-project-assignment

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Create a .env file in the root directory: Add the following:**

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   NODE_ENV=development
   SALT_ROUND=value
   ACCESS_TOKEN_SECRET=value
   REFRESH_TOKEN_SECRET=value
   JWT_ACCESS_EXPIRE_IN=value
   JWT_REFRESH_EXPIRE_IN=value
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

5. **Access the API locally:**

   ```bash
   http://localhost:5000/api
   ```

## **📋 API Documentation **

### Base URL:

`https://blog-project-assignment.vercel.app`

---

### Endpoints

## **Authentication**

---

### **1. Register User**

- **Endpoint:** **`/api/auth/register`**
- **Description:** Registers a new user with the platform. It validates user data and saves it to the database.
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

- **Response:** Success

```jsx
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}

```

- **Response:** Failure

```jsx
{
    "success": false,
    "message": "Validation Error",
    "statusCode": 400,
    "error": [
        {
            "path": "",
            "message": "Error message"
        }
    ],
    "stack": "error stack"
}
```

---

### **2. Login User**

- **Endpoint:** **`/api/auth/login`**
- **Description:** Authenticates a user with their email and password and generates a JWT token

```jsx
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

- **Response:** Success

```jsx
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}

```

- **Response:** Failure

```jsx
{
    "success": false,
    "message": "Invalid credentials",
    "statusCode": 400,
    "error": [
        {
            "path": "",
            "message": "Invalid credentials"
        }
    ],
    "stack": "error stack"
}
```

---

## **Blog Management**

---

### **1. Create Blog**

- **Endpoint:** **`/api/blogs`**
- **Description:** Allows a logged-in user to create a blog by providing a title and content.
- **Request Header:** Authorization: Bearer <token>.
- **Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

- **Response:** Success

```jsx
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}

```

- **Response:** Failure

```jsx
{
    "success": false,
    "message": "Validation Error",
    "statusCode": 400,
    "error": [
        {
            "path": "content",
            "message": "Content is required"
        }
    ],
    "stack": "error stack"
}
```

---

### **2. Update Blog**

- **Endpoint:** **`/api/blogs/:id`**
- **Description:** Allows a logged-in user to update their own blog by its ID.
- **Request Header:** Authorization: Bearer <token>.

```jsx
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

- **Response:** Success

```jsx
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}

```

### **3. Delete Blog**

- **Endpoint:** **`/api/blogs/:id`**
- **Description:** Allows a logged-in user to delete their own blog by its ID.
- **Request Header:** Authorization: Bearer <token>.

- **Response:** Success

```jsx
{
    "success": true,
    "message": "Blog deleted successfully",
    "statusCode": 200
}

```

---

### **4. Get All Blogs (Public)**

**Endpoint:** **`/api/blogs`**

**Query Parameters**:

- `search`: Search blogs by title or content (e.g., `search=blogtitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `author=authorId`).

**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&author=60b8f42f9c2a3c9b7cbd4f18
```

In this example:

- `search=technology`: Filters blogs containing the term "technology" in the title or content.
- `sortBy=createdAt`: Sorts the blogs by the `createdAt` field.
- `sortOrder=desc`: Sorts in descending order (newest blogs first).
- `filter=60b8f42f9c2a3c9b7cbd4f18`: Filters blogs authored by the user with the given `authorId`.

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    },
    ...
  ]
}
```

###

### **Admin Actions**

### **1. Block User**

**PATCH** `/api/admin/users/:userId/block`

**Description:** Allows an admin to block a user by updating the `isBlocked` property to `true`.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

####

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

**Description:** Allows an admin to delete any blog by its ID.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

---
