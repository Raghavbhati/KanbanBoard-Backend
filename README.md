# KanbanBoard-Backend

## Introduction
Welcome to the Kanban Board Backend repository. In this project, I aim to demonstrate my skills in backend web development, utilizing a combination of Node.js, Express, and MongoDB to create a robust and efficient backend system. The assignment revolves around building a comprehensive backend for a Kanban board application for Mathongo. This backend system is designed to handle various operations such as user authentication, task management, and board updates, providing a solid foundation for a frontend application to interact with. The application is hosted on an AWS server, showcasing its scalability and reliability.

## Tech Stack
The application is built with the following technologies:
- Node.js
- Express
- MongoDB
- AWS
- Passport.js
- OAuth

## Installation
To get started with the project, follow these steps:

1. Clone the repository.

```bash
https://github.com/Raghavbhati/KanbanBoard-Backend.git
```

2. Install the dependencies using.

```bash
npm install
```

3. Start the application by running `npm run dev`.

```bash
npm run dev
```

The application will start running on port 9000.

## File Structure
(Here you can provide an image or a brief description of the file structure of your project.)

## API Endpoints
The application provides the following APIs:

### User APIs
- `GET /google`: Login & Signup via Google. This endpoint uses Passport.js for authentication.
- `GET /google/callback`: Callback API for Passport.js. This endpoint checks if the user already exists in the database, if not, it adds the user.
- `GET /google/failed`: If the callback request fails, this endpoint is called.
- `POST /logout`: For logout request.

### Board APIs
- `POST /add`: Create a new board. This endpoint requires authentication.
- `GET /:id`: Get a single board. This endpoint requires authentication.
- `GET /allDetails/:id`: Get full board details. This endpoint requires authentication.
- `PATCH /:id`: Update a board. This endpoint does not require authentication.

### Task APIs
- `POST /add`: Add a new task. This endpoint requires authentication.
- `GET /:id`: Get a single task. This endpoint does not require authentication.
- `PATCH /:id`: Update a task. This endpoint does not require authentication.

Each endpoint has specific requirements and responses. For more details, please refer to the backend documentation.


## Important links:


**Portfolio:** https://www.raghavbhatirv.in/

**Github:** https://github.com/Raghavbhati

**Linkdin:** https://www.linkedin.com/in/raghavbhatirv/

**Twitter:** https://twitter.com/raghavbhatirv/
