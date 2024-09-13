# BlogPost-Node
# Blog Post Website

This is a blog post website built using **Node.js** and **Express.js**. It allows users to create, read, update, and delete blog posts. User authentication is handled using JSON Web Tokens (JWT), and the data is stored in a MongoDB database.

## Features

- **User Authentication**: Users can register, log in, and manage their sessions using JWT.
- **CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Responsive Design**: The UI is designed to be responsive and user-friendly.
- **EJS Templating**: Server-side rendering using **Embedded JavaScript (EJS)**.
- **Logging**: Request logging with **Morgan**.
- **Environment Variables**: Managed using **dotenv**.
  
## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **EJS**: Templating engine.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **Nodemon**: Tool for automatically restarting the server during development.
- **Morgan**: HTTP request logger middleware.
- **dotenv**: Environment variable management.

## Installation

To get a local copy of this project up and running, follow these simple steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/kratika-210/BlogPost-Node.git

2. Navigate into the project directory:

    cd BlogPost-Node

3. Install the necessary dependencies:

    npm install

Running the Application

1. npm run start