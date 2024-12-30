# Task Manager Web Application

## Description
The Task Manager Web Application is a full-stack project that enables users to efficiently manage their tasks. Users can register, log in, and perform CRUD (Create, Read, Update, Delete) operations on tasks. The application includes secure user authentication, an intuitive interface, and a robust backend with database integration.

## Features
- **User Authentication**: Register and log in using secure JWT-based authentication.
- **Task Management**: Add, view, update, and delete tasks.
- **Responsive Design**: Fully responsive frontend for various screen sizes.
- **Error Handling**: Meaningful error messages and robust validation.
- **Secure Data**: Password hashing and protection against common security vulnerabilities.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- [MongoDB/PostgreSQL (choose one) with the database server running]

### Steps to Set Up
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/task-manager-web-app.git
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following:
     ```env
     PORT=3000
     MONGODB_URL=<your-database-url>
     JWT_SECRET=<your-secret-key>
     CLIENT_URL=<your-fontened-url>
     ```
   - Start the server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Register**:
   - Go to the Register page and fill in the required details.
   
2. **Log In**:
   - Use your credentials to log in.

3. **Manage Tasks**:
   - Add, edit, or delete tasks using the intuitive interface.

## Screenshots

### User Registration Page
![User Registration Page](![image](https://github.com/user-attachments/assets/d594bf59-b161-4c69-af78-84e148499f1c)
)

### Task Management Page
![Task Management Page]()

Add your screenshots in the `screenshots` folder and update the paths in this section.

## Folder Structure
```
project-root/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
├── screenshots/
│   ├── register.png
│   └── tasks.png
└── README.md
```

  

