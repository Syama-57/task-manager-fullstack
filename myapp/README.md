Task Manager – Full Stack Application

A full-stack Task Manager application built using React and Django REST Framework with JWT authentication.
Users can securely register, log in, and manage their personal tasks with full CRUD functionality.

Features

JWT-based user authentication (Login / Register / Logout)

Secure task management (tasks are private per user)

Create, edit, delete tasks

Mark tasks as completed or pending

Filter tasks (All / Completed / Pending)

Completion percentage progress indicator

Dark / Light mode toggle

Clean, responsive, and minimal UI

Tech Stack
Frontend

React

Axios

CSS

Backend

Django

Django REST Framework

SimpleJWT

SQLite (default database)

Project Structure
Backend
core/
├── tasks/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── core/
│   ├── settings.py
│   └── urls.py
└── manage.py

Frontend
frontend/
├── src/
│   ├── App.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.css
│   └── main.jsx
├── public/
│   └── index.html
└── package.json

API Endpoints
Method	Endpoint	Description
POST	/api/register/	Register new user
POST	/api/login/	Login (JWT)
GET	/api/tasks/	Get logged-in user tasks
POST	/api/tasks/	Create task
PATCH	/api/tasks/<id>/	Update task
DELETE	/api/tasks/<id>/	Delete task
Setup Instructions
Backend
cd core
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Backend runs at: http://127.0.0.1:8000/

Frontend
cd frontend
npm install
npm run dev


Frontend runs at: http://localhost:5173/

Usage

Open the frontend URL in a browser.

Register a new account or Login if you already have one.

Add new tasks using the input form.

Click task title to mark it completed/pending.

Edit or delete tasks using respective buttons.

Filter tasks using All / Completed / Pending.

Toggle Dark/Light mode using the button at the top-right.

Progress bar shows the percentage of completed tasks.

Screenshots


Login Page -![Login Page](myapp/login.png)

Register Page -![Register page](myapp/register.png)

Dashboard -![Dashboard Light](myapp/dashboard-light.png)

Dashboard - ![Dashboard Dark](myapp/dashboard-dark.png)

Deployment (Optional)

Backend: Render / Railway

Frontend: Vercel

⚠️ Update frontend API URLs if backend is deployed to a live server.

Notes

Tasks are private per user

JWT tokens are stored in localStorage for session persistence

Password validation and security enforced by Django