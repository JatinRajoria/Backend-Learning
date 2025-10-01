# User Authentication API

This project provides a **simple and secure user authentication system** using **Node.js, Express, and MongoDB**. It includes user registration, login, and protected routes for fetching user data.

## API Endpoints

### 1. Register User

* **Endpoint:** `POST /register`
* **Description:** Create a new user account.
* **Request Body:**

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
* **Response:**

  * **Success (201):** User registered successfully.
  * **Error (400):** Validation errors or username already exists.

---

### 2. Login User

* **Endpoint:** `POST /login`
* **Description:** Authenticate a user and generate an access token.
* **Request Body:**

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
* **Response:**

  * **Success (200):** Returns a JWT token for authenticated access.
  * **Error (401):** Invalid username or password.

---

### 3. Get User Data

* **Endpoint:** `GET /user`
* **Description:** Retrieve the currently logged-in user's data. This is a **protected route** and requires authentication.
* **Headers:**

  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```
* **Response:**

  * **Success (200):** Returns user details (username, ID, etc.).
  * **Error (401):** Unauthorized access if no valid token is provided.

---

## Key Features

* **JWT-based authentication** for protecting sensitive endpoints.
* Users are stored in a **MongoDB collection**.

## Usage

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file with:

   ```env
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_secret_key>
   ```
4. Start the server with `npm start`.
5. Use API endpoints via Postman or any API client.

---

This README provides a clean and professional overview of the user authentication system for easy understanding and usage in your GitHub repository.
