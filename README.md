# Employee Management System

> A lightweight React + Vite app for managing employees with Supabase integration.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run (development)](#run-development)
  - [Build for production](#build-for-production)

## Overview

This repository contains a small Employee Management System built with React, Vite and Tailwind CSS. It uses Supabase for backend services (auth, database) and includes convenience scripts and seed data to populate example employee records.

## Features
- Login / protected routes
- Admin dashboard and profile pages
- Reusable UI components (in `src/components/ui`)
- Supabase client integration

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Supabase (JS client)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (or yarn/pnpm)

### Install
From the project root, install dependencies:

```powershell
npm install
```

### Run (development)

```powershell
npm run dev
```

This runs Vite in development mode. Open the URL printed in the terminal (usually `http://localhost:5173`).

### Build for production

```powershell
npm run build

# Preview the production build locally
npm run preview
```

