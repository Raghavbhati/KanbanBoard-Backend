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
- `POST /add`: Create a new board.
- `GET /:id`: Get a single board.
- `GET /allDetails/:id`: Get full board and connected task details.
- `PATCH /:id`: Update a board.

### Task APIs
- `POST /add`: Add a new task.
- `GET /:id`: Get a single task.
- `PATCH /:id`: Update a task.

Each endpoint has specific requirements and responses. For more details, please refer to the backend documentation.


## Important links:


**Portfolio:** https://www.raghavbhatirv.in/
<br>
**Github:** https://github.com/Raghavbhati
<br>
**Linkdin:** https://www.linkedin.com/in/raghavbhatirv/
<br>
**Twitter:** https://twitter.com/raghavbhatirv/
