# MERNAuthTemplate

## Overview

MERNAuthTemplate is a comprehensive authentication template for MERN stack applications. It provides essential features for user authentication, including login, signup, password reset, and forgot password functionalities.

## Features

- **Login**: Secure user login endpoint.
- **Signup**: User registration with email verification.
- **Reset Password**: Endpoint to allow users to reset their passwords.
- **Forgot Password**: Endpoint for users to recover their passwords.

## Project Structure

The project is organized into the following main directories:

### `client`

Contains the React frontend application.

- **`src/`**: Source code for the React application including components and pages.
- **`public/`**: Static assets and HTML file.

### `server`

Contains the backend application using Node.js and Express.

- **`middleware/`**: Custom middleware functions for authentication.
- **`models/`**: Mongoose models for MongoDB.
- **`routes/`**: Express route handlers for authentication endpoints.
- **`services/`**: Services for handling business logic like email notifications.
- **`utils/`**: Utility functions.
- **`server.js`**: Main server file.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn

### Installation
1. **Clone the repository:**

   ```bash
   git clone git@github.com:vijaypal-hestabit/MERNAuthTemplate.git
   cd MERNAuthTemplate
   ```

2. **Install dependencies:**
    This project is used concurrently to manage the installation of dependencies for both the client and server.
   ```bash
   npm install
   ```

3. **Configure environment variables:**
    Create a .env file in the server directory with the following example configuration:
   ```bash
   NODE_ENV=5000
   NODE_ENV=development
   EMAIL_USER=example@domain.com
   EMAIL_PASS=app_password
   JWT_SECRET=password
   MONGO_STRING=mongodb://localhost:27017/mern-auth
   APP_URL=http://localhost:3000
   JWT_SECRET_EXPIRE=1d # like "1h", "30m", "2d"
   ```

   Create a .env file in the client directory with the following example configuration:
   ```bash
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the application:**
    
   - **For development:**
     ```bash
     npm run start:dev
   - **For production:**
     ```bash
     npm run start:prod
     ```

     ***If you prefer to run the server and client applications individually:***

    - **Start the server (backend) application:**
      ```bash
       npm run start:dev
       ```

      *or for production:*

      ```bash
       npm run start:server
      ```

    - **Start the client (frontend) application:**
      ```bash
       npm run start:client
       ```

## Usage

- **Frontend**: Navigate to [http://localhost:3000](http://localhost:3000) to access the React frontend.
- **Backend**: The API will be available at http://localhost:5000 (or your configured port).

## Contributing

   1. Fork the repository.
   2. Create a feature branch (**git checkout -b feature/YourFeature**).
   3. Commit your changes (**git commit -am 'Add some feature'**).
   4. Push to the branch (**git push origin feature/YourFeature**).
   5. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.


### Key Updates:

- **Installation**: Added instructions for installing dependencies individually for the client and server.
- **Starting the Application**: Included options for individually starting the server and client applications.