<div align="center">

# 📐 Chobansky Design Portal

**A full-stack portfolio and ordering platform for architectural, residential and environmental design projects.**

<br />

[![License](https://img.shields.io/badge/License-ISC-000000?style=for-the-badge&logo=opensourceinitiative&logoColor=3DA639)](#-licence)
[![React](https://img.shields.io/badge/React_18-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-000000?style=for-the-badge&logo=vite&logoColor=646CFF)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router_7-000000?style=for-the-badge&logo=reactrouter&logoColor=CA4245)](https://reactrouter.com)
[![Node.js](https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=5FA04E)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=mongodb&logoColor=47A248)](https://www.mongodb.com)

</div>

---

## 📖 About

Chobansky Design Portal is a decoupled **React single-page application** backed by a **Node.js / Express** REST API with **MongoDB** for persistence. Visitors browse a catalogue of design projects; signed-in users can like projects into a wishlist, comment on them and place service orders.

## ✨ Features

- 🏛️ **Project catalogue** — industrial, urban, public and residential projects with target area, budget and an image carousel.
- 🔎 **Filter and search** — filter by category and search by name.
- ❤️ **Wishlist and ratings** — like or dislike projects; liked projects collect in a personal wishlist.
- 💬 **Comments** — signed-in users can discuss each project.
- 🧾 **Orders** — create, view, update and delete service orders.
- 👤 **Profile** — view, update and delete your account.
- 🔐 **Authentication** — JWT sessions, bcrypt-hashed passwords, persisted login state.
- 🛡️ **Route guards** — `IsAuth` and `IsGuest` guards protect dashboards and keep signed-in users off the login pages.
- 🪝 **Custom hooks and context** — `useAuth`, `useForm` and a central `AuthContextProvider`, with no prop-drilling.

## 🛠️ Tech Stack

| Layer          | Technologies                                                         |
| -------------- | -------------------------------------------------------------------- |
| **Frontend**   | React 18 · React Router 7 · CSS Modules · react-toastify · react-icons |
| **Backend**    | Node.js · Express · TypeScript · Nodemon · ts-node                   |
| **Database**   | MongoDB · Mongoose (Projects, Users, Comments, Orders)               |
| **Security**   | JSON Web Tokens · bcrypt · CORS                                      |
| **Build**      | Vite · ESLint                                                        |

## 📁 Project Structure

```text
├── client/                 # React SPA (Vite)
│   └── src/
│       ├── api/            # requester and API modules
│       ├── components/     # pages and UI components
│       ├── contexts/       # AuthContext
│       ├── guards/         # IsAuth, IsGuest
│       ├── hooks/          # useAuth, useForm, ...
│       └── utils/
└── server/                 # Express API
    └── src/
        ├── controllers/
        ├── middlewares/
        ├── models/         # Project, User, Comment, Order
        ├── services/
        ├── routes.ts
        └── server.ts
```

## 🚀 Getting Started

**Requirements:** Node 20+ and a MongoDB instance on `localhost:27017`.

```bash
git clone https://github.com/kirilchobansky/chobansky-design-business.git
cd chobansky-design-business

# API (http://localhost:3000)
cd server
npm install
npm start

# Client (http://localhost:5173), in a second terminal
cd client
npm install
npm run dev
```

The API connects to `mongodb://localhost:27017/chobansky-design` and allows CORS from `http://localhost:5173`.

### Configuration

The API signs login tokens with the `JWT_SECRET` environment variable (see `server/.env.example`).

```bash
JWT_SECRET="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" npm start
```

- **Production:** `JWT_SECRET` is required (with `NODE_ENV=production` the server refuses to start without it).
- **Development:** if it is not set, a temporary random secret is used and everyone is logged out on each restart.

### Scripts

| Where    | Command         | What it does                      |
| -------- | --------------- | --------------------------------- |
| `client` | `npm run dev`   | Start the Vite dev server         |
| `client` | `npm run build` | Production build into `dist/`     |
| `client` | `npm run lint`  | Run ESLint                        |
| `server` | `npm start`     | Run the API with Nodemon          |
| `server` | `npm run build` | Compile TypeScript                |

## 📄 Licence

Released under the **ISC** licence.
