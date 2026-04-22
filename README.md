# 🗂️ Team Tasks Management App

A modern **role-based task management system** built with React, Vite, TanStack Query, and a modular feature-sliced architecture.  
The app supports **Admin and Member roles**, with full authentication, task workflows, and reusable UI components.

---

## 🚀 Tech Stack

- ⚡ Vite + React + TypeScript
- 🎯 React Router (nested + protected routes)
- 🔄 TanStack Query (server state management)
- 🔐 Role-based Authentication (Context API + Guards)
- 🌐 Axios (centralized API client)
- 🎨 Tailwind CSS + ShadCN UI + Aceternity UI + ReactBits
- 🧩 Feature-Sliced Architecture

---

## 📁 Project Structure
```src/
│
├── features/
│ ├── auth/ # Authentication (login, register, hooks, guards)
│ ├── users/ # Users feature (API, hooks, types)
│ ├── tasks/ # Tasks feature (CRUD, hooks, services, UI)
│
├── pages/
│ ├── auth/ # Login & Register pages
│ ├── dashboard/ # Admin & User dashboards
│ ├── detailpage/ # Task detail pages (Admin/User)
│
├── layouts/ # Protected layout (sidebar, shell)
├── shared/ # Reusable utilities & UI
├── components/ # UI components (sidebar, Navbar)
├── lib/ # Utility functions (cn, helpers)
├── routes/ # App routing configuration
├── providers/ # Global providers (Auth, Query, Theme)
```

---

## 🔐 Authentication Flow

- JWT-based authentication
- Stored in `localStorage`
- Global state managed via `AuthProvider`
- Route protection via `AuthGuard`

### Roles
- **Admin**
  - Full task management
  - Admin dashboard
  - Admin task detail view

- **Member**
  - View assigned tasks
  - User dashboard
  - Limited task actions

---

## 📦 Features

### 🔑 Auth
- Login / Register
- Persistent session
- Role-based redirects

### 🗂️ Tasks
- Create tasks
- Update tasks
- Delete tasks
- Update task status
- View task details (Admin/User)

### 👥 Users
- Fetch users list
- User type management (admin/member)

### 📊 Dashboards
- Admin dashboard (full control view)
- User dashboard (personal task view)

---

## 🧠 Architecture Highlights

### Feature-Based Design
Each feature is self-contained:
```
feature/
├── api/
├── hooks/
├── types/
├── constants/
├── components/
```

### API Layer
- Centralized Axios instance (`apiClient`)
- Interceptors for auth handling
- Error handling globally

### State Management
- React Query for server state
- Context API for auth state
- Cached queries with query keys factories

---

## 🧭 Routing System

- Nested routing using `react-router-dom`
- Protected routes using `AuthGuard`
- Role-based redirects (Admin / Member)

---

## 🎨 UI System

- Sidebar navigation (role-aware)
- Reusable UI components (ShadCN / Aceternity / ReactBits)
- Animated background (LightRays for auth pages)
- Tailwind utility system with `cn()` helper

---

## ⚙️ Setup & Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production
npm run build
```
🌐 Environment Variables

Create a .env file:
```
VITE_API_URL=https://your-backend-url.com
```
📌 Future Improvements
- Real-time task updates (WebSockets)
- Notifications system
- Advanced filtering & search
- Pagination for tasks/users
- Admin analytics dashboard