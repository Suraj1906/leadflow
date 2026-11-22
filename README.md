# 🚀 LeadFlow – MERN Stack Lead Management CRM

**LeadFlow** is a modern, full-stack Lead Management CRM application built using the MERN stack. It helps users manage potential customers, organize business contacts, track lead progress, and monitor performance through an interactive dashboard.

The application includes secure authentication, complete lead management functionality, dashboard analytics, search, filtering, sorting, and pagination — all wrapped in a clean, responsive SaaS-style interface.

## 🌐 Live Demo

**Live Application:** https://leadflow-frontend-blush.vercel.app/login

**Backend API:** https://leadflow-backend-one.vercel.app/

**GitHub Repository:** https://github.com/Suraj1906/leadflow

---

## ✨ Features

### 🔐 Authentication & Security
- User registration and login.
- Secure password hashing using bcrypt.
- JWT-based authentication.
- Protected routes for authenticated users.
- User-specific lead management.
- Each user can access and manage only their own leads.

### 📊 Interactive Dashboard
- Overview of total leads.
- Separate counts for New, Contacted, Qualified, and Lost leads.
- Visual lead growth chart.
- Recent leads overview.
- Date-range filtering for dashboard statistics and recent leads.
- CSV export functionality.

### 👥 Lead Management
- Create new leads with customer information.
- Edit existing lead details.
- Update lead status.
- Delete leads with a confirmation dialog.
- Search leads by name.
- Filter leads by status.
- Sort leads.
- Pagination for efficient data navigation.

**Lead Information:**
- Full Name
- Email Address
- Phone Number
- Company
- Lead Source
- Lead Status

**Available Lead Statuses:**
- New
- Contacted
- Qualified
- Lost

### 🎨 Modern UI & User Experience
- Premium SaaS-style dashboard.
- Clean sidebar navigation.
- Responsive design for desktop, tablet, and mobile.
- Modern typography and gradient styling.
- Interactive modals and UI elements.
- Loading states and error handling.
- Smooth transitions and hover effects.

---

## 📸 Application Screenshots

### 1. Login Page

Secure login interface with a modern design for existing users.

<img width="1307" height="642" alt="llog" src="https://github.com/user-attachments/assets/3ca0eef2-6dd2-4a75-aa40-601a3a7942af" />


### 2. Dashboard Page

The dashboard provides an overview of lead management performance, including total leads, status-wise statistics, lead growth visualization, and recently added leads.

<img width="1343" height="631" alt="ldas" src="https://github.com/user-attachments/assets/6efe95fd-22dc-4abe-873a-af7344bf26ee" />


**Dashboard Highlights:**
- Total leads and status-wise counts.
- Lead growth chart.
- Recent leads section.
- Date-range filtering.
- CSV export option.

### 3. All Leads Page

The All Leads page displays all leads in a structured table with search, status filtering, sorting, and pagination.

<img width="1341" height="569" alt="lleads" src="https://github.com/user-attachments/assets/850caecc-6d50-4b84-90bc-7439566acd14" />


**Lead Management Actions:**
- The **Add Lead** button is available on the All Leads page to create new leads.
- **Edit** and **Delete** action buttons are available in the Actions column of each lead's table row.
- Users can update lead information, change statuses, and remove leads.
- A confirmation dialog appears before deleting a lead.

### 4. Search Leads

The search functionality allows users to quickly find leads by name from the All Leads page.

<img width="1042" height="142" alt="lsearc" src="https://github.com/user-attachments/assets/7d9f7c74-904d-401e-abb0-5f2d7834b228" />


### 5. Filter Leads by Status

Users can filter the leads table by selecting a particular lead status, such as New, Contacted, Qualified, or Lost.

### 6. Add Lead Modal

The Add Lead modal allows users to create a new lead by entering customer details, selecting a lead source, and choosing a lead status.

<img width="858" height="590" alt="ladd" src="https://github.com/user-attachments/assets/8c9f99a3-48a0-4f7b-b69d-76173c3ef094" />


**Note:** The Add Lead button is available on the All Leads page.

### 7. Edit Lead Modal

The Edit Lead modal allows users to modify existing lead information, update customer details, and change the lead status.

<img width="1024" height="201" alt="ledt" src="https://github.com/user-attachments/assets/e1706f1a-a8fd-40c4-a348-94b567fda8b4" />


**Note:** The Edit button is available in the Actions column of each lead's row on the All Leads page.

### 8. Delete Lead Confirmation

The Delete Confirmation modal helps prevent accidental deletion by asking users to confirm before removing a lead.

<img width="576" height="541" alt="ldelt" src="https://github.com/user-attachments/assets/474927c4-86b2-4437-97c3-e11010758744" />


**Note:** The Delete button is available in the Actions column of each lead's row on the All Leads page.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Express Validator

### Deployment & Tools
- MongoDB Atlas
- Vercel
- Git & GitHub
- VS Code

---

## 📁 Project Structure

```text
leadflow/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── leads/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── .env.example
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── screenshots/
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run LeadFlow locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Suraj1906/leadflow.git
cd leadflow
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Start the Backend

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 6. Configure Frontend Environment Variables

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000/api
```

### 7. Start the Frontend

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

---

## 🔌 API Overview

The backend provides RESTful APIs for authentication and lead management.

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate an existing user |

### Lead Management

The protected lead management APIs support:

- Creating leads.
- Fetching leads.
- Updating lead information and status.
- Deleting leads.
- Searching and filtering.
- Sorting and pagination.
- Dashboard statistics.
- Lead growth data.

### Health Check

`GET /api/health`

Used to verify backend API availability.

---

## 🔒 Security & Data Handling

- Passwords are hashed before storing them in MongoDB.
- JWT tokens are used to authenticate protected API requests.
- Authorization middleware protects private routes.
- Leads are associated with their respective users.
- Input validation helps maintain data integrity.
- Environment variables keep sensitive configuration outside the source code.

---

## 🚀 Deployment

LeadFlow is deployed using Vercel and MongoDB Atlas.

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Vercel |
| Database | MongoDB Atlas |

Production environment variables are configured separately in Vercel.

---

## 🎯 Project Objective

The main objective of LeadFlow was to build a practical, full-stack CRM application demonstrating real-world development concepts:

- REST API development.
- Authentication and authorization.
- MongoDB database integration.
- Complete CRUD operations.
- Protected routes.
- Frontend and backend integration.
- Dashboard data aggregation.
- Search, filtering, sorting, and pagination.
- Responsive UI development.
- Production deployment.

---

## 👨‍💻 Author

**Suraj Bhardwaj**

Full Stack Developer | MERN Stack

- GitHub: https://github.com/Suraj1906
- Project Repository: https://github.com/Suraj1906/leadflow

---

⭐ If you find this project interesting, feel free to explore the repository and share your feedback.

**Built with ❤️ using the MERN Stack.**
