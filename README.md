# 👥 Employee Management System

> A modern, lightweight React + Vite web application for managing employees with a beautiful UI, featuring digital business cards, QR codes, and vCard downloads.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Deployment](#-deployment)
- [License](#-license)

## 🌟 Overview

This Employee Management System is a modern web application built with React and Vite. It provides a comprehensive solution for managing employee data with a beautiful, responsive design system. The application uses the public Faker API for demo purposes, eliminating the need for a backend database.

**Live Demo:** [https://ahmedgamalfarouk.github.io/Employee-Managment-System/](https://ahmedgamalfarouk.github.io/Employee-Managment-System/)

## ✨ Features

### Core Functionality
- 🔐 **Authentication** – Login system with protected routes
- 👨‍💼 **Employee Management** – Add, edit, and delete employee records
- 📱 **Digital Business Cards** – Public profile pages for each employee
- 📊 **Admin Dashboard** – Comprehensive management interface

### Digital Card Features
- 📷 **QR Code Generation** – Instant QR codes for each employee profile
- 📇 **vCard Download** – Save contact information directly to your device
- 🔗 **Shareable Profiles** – Public URLs for employee profiles

### UI/UX
- 🎨 **Modern Design System** – Consistent, beautiful components
- 🌙 **Dark Mode Support** – Built with dark-first design
- ✨ **Smooth Animations** – Framer Motion powered transitions
- 📱 **Fully Responsive** – Mobile-first approach

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 |
| **Build Tool** | Vite 5.2 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM 7 |
| **Icons** | React Icons |
| **QR Codes** | react-qr-code |
| **File Download** | file-saver |
| **Utilities** | clsx, tailwind-merge |

## 📁 Project Structure

```
employee-managment-system/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Badge.jsx          # Status badges
│   │   │   ├── Button.jsx         # Button variants
│   │   │   ├── Card.jsx           # Card containers
│   │   │   ├── Input.jsx          # Form inputs
│   │   │   ├── Modal.jsx          # Dialog modals
│   │   │   ├── Spinner.jsx        # Loading indicators
│   │   │   ├── Textarea.jsx       # Text areas
│   │   │   ├── Toast.jsx          # Notifications
│   │   │   └── index.js           # Component exports
│   │   └── ProtectedRoute.jsx     # Auth guard component
│   ├── hooks/
│   │   └── useToast.js            # Toast notification hook
│   ├── pages/
│   │   ├── AdminDashboard.jsx     # Main admin interface
│   │   ├── DesignSystemShowcase.jsx # Component showcase
│   │   ├── Login.jsx              # Authentication page
│   │   └── Profile.jsx            # Public employee profile
│   ├── utils/
│   │   ├── cn.js                  # Class name utility
│   │   ├── fakerApi.js            # Faker API integration
│   │   └── localEmployees.js      # Local state management
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # App entry point
├── DESIGN_SYSTEM.md               # Design system documentation
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm**, **yarn**, or **pnpm**

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/AhmedGamalFarouk/Employee-Managment-System.git

# Navigate to project directory
cd Employee-Managment-System

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

This runs Vite in development mode. Open the URL printed in the terminal (usually `http://localhost:5173`).

### Production Build

Build and preview the production bundle:

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## 📍 Pages & Routes

| Route | Page | Access | Description |
|-------|------|--------|-------------|
| `/login` | Login | Public | User authentication |
| `/admin` | Admin Dashboard | Protected | Employee management interface |
| `/profile/:id` | Profile | Public | Public employee business card |
| `/showcase` | Design Showcase | Public | Component library showcase |
| `/` | — | — | Redirects to `/admin` |

## 🧩 Components

The application includes a comprehensive UI component library:

| Component | Description |
|-----------|-------------|
| `Button` | Customizable buttons with multiple variants and sizes |
| `Card` | Flexible card containers with hover effects |
| `Input` | Form inputs with validation states |
| `Textarea` | Multi-line text inputs |
| `Modal` | Accessible dialog modals with animations |
| `Badge` | Status indicators and labels |
| `Spinner` | Loading indicators |
| `Toast` | Notification system |

For detailed component documentation, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

## 🌐 Deployment

This project is configured for GitHub Pages deployment:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

The `deploy` script uses `gh-pages` to publish the `dist` folder to the `gh-pages` branch.

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/AhmedGamalFarouk">Ahmed Gamal Farouk</a>
</p>
