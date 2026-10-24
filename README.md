## 📋 DriftBoard

A Trello-inspired task management web application that helps teams organize projects, manage tasks, and collaborate through customizable boards and columns. It features task management, real-time updates, and team member collaboration to keep everyone in sync.

## ⚒️ Technologies

> #### Front-End: React, TypeScript, React Router, Tanstack (React) Query, Socket.IO, Zustand, (Framer) Motion, Dnd Kit, TailwindCSS, Lucide Icons, Vite

> #### Back-End: Node.js, TypeScript, Express, Socket.IO, JWT, Argon2, Prisma ORM

> #### Database: PostgreSQL

## 💫 Functionality

- **Authentication:** User signup and login
- **Board Management:** Create, edit, and delete boards with customizable titles and icons
- **Column Management:** Add columns to organize tasks within boards
- **Task Management:** Create, edit, delete tasks within columns
- **Team Collaboration:** Invite other users to boards and collaborate on shared projects
- **Real-Time Synchronization:** Instantly reflect other users' actions across connected clients, accompanied by notifications

## 🤸 Running the Project

1. Make sure you have Node.js (and pgAdmin if you want) installed on your system;
2. Clone this repository;
3. Create a PostgreSQL database (whether with Docker or pgAdmin);
4. In the `backend` directory, create a `.env` file and add these keys:
   ```env
   DATABASE_URL="postgresql://[user]:[password]@localhost:[port]/[db_name]"
   FRONTEND_URL="http://localhost:5173"
   JWT_SECRET="[your JWT secret key]"
   PORT=5000
   ```
   Adjust `PORT` to the port you want and `DATABASE_URL` for your user, password, port and database name;  
   JWT secret key can be created with this command: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`;
5. Open a terminal in the `backend` directory and run these commands:
   ```bash
   npm install                 # installs npm dependencies
   npx prisma migrate deploy   # creates the tables (needs DATABASE_URL)
   npx prisma generate         # generates the prisma client in src/generated
   npm run dev                 # starts the backend on http://localhost:PORT
   ```
   Don't close the terminal;
6. In the `frontend` directory, create a `.env` file and add this key:
   ```env
   VITE_BACKEND_URL=http://localhost:[PORT]
   ```
   Instead of `[PORT]`, set the port value from your backend `.env`;
7. Open a second terminal in the `frontend` directory and run these commands:
   ```bash
   npm install                 # installs npm dependencies
   npm run dev                 # starts the frontend on http://localhost:5173
   ```
8. Visit `http://localhost:5173` in your browser.

## Preview

### Mobile:

<p style="display: flex; gap: 1rem">
  <img src="./images/auth-mobile.jpg" alt="Board Mobile" width="25%">
  <img src="./images/home-mobile.jpg" alt="Home Mobile" width="25%">
  <img src="./images/board-mobile.jpg" alt="Board Mobile" width="25%">
</p>

### Desktop:

<p style="display: flex; flex-direction: column; gap: 1rem">
  <img src="./images/auth.png" alt="Board Desktop" width="70%">
  <img src="./images/home.png" alt="Home Desktop" width="70%">
  <img src="./images/board.png" alt="Board Desktop" width="70%">
</p>

## Future Improvement Ideas

- Develop a 'Forgot Password?' feature
- Implement user permissions' management in boards
- Add a Profile page, where the logged in user can see and update their information
- Add Task attachments and comments
