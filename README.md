# Project Plan

## 1. Initialize React App

- [x] Create a new React application using Create React App or a similar starter template.

## 2. Home Page

- **Header**
  - [x] Add HTML structure for the header.
  - [x] Apply CSS styling.
- **Home Image**
  - [x] Add HTML for the home image.
  - [x] Style with CSS.

## 3. Projects List Page

- [x] Add static HTML and CSS for the projects list.
- [x] Load project data dynamically from the server.

## 4. Projects Details Page

- **Project Details**
  - [x] Add static HTML and CSS for project details.
  - [x] Implement an API to fetch project details from the server.
- **Comments Section**
  - [x] Add HTML and CSS for the comments section.
  - [x] Implement an API to handle comments.

## 5. Server-Side Setup

- **Projects Collection**
  - [x] Add projects to the server collection.
- **API Folder**
  - [x] Create a `requester` file for API requests.

## 6. Authentication

- **Custom Hooks**
  - [x] Create `useForm` for handling form inputs.
  - [x] Create `useAuth` for managing authentication state.
- **Login**
  - [x] Create a `Login` component.
  - [x] Implement login API integration.
  - [x] Handle validation and error messages.
- **Register**
  - [x] Create a `Register` component.
  - [x] Implement register API integration.
  - [x] Handle validation and error messages.
- **Logout**
  - [x] Create a `Logout` component.
  - [x] Implement logout API integration.
  - [x] Add authorization handling in the requester.
- **Route Guards**
  - [x] Implement route guards to protect authenticated routes.

## 7. Refactoring

- **Extract Auth State**
  - [x] Refactor to extract authentication state from the `App` component.
- **Persist Auth State**
  - [x] Implement state persistence using local storage or similar methods.
- **Migrate to MongoDB**
  - [x] Migrate from the SoftUni practice server to a MongoDB server.
  - [x] Create a `src` folder in the server directory.
  - [x] Add a `server.ts` file.
  - [x] Implement routes, controllers, models, and services.

## 8. Profile Page

- [x] Add HTML and CSS for the profile page.
- [x] Load dynamic user information.
- [x] Implement update and delete functionalities.

## 9. Filter Projects

- **Category Model**
  - [x] Add a category field to the project model.
- **Preseed Projects**
  - [x] Preseed new projects with category data.
- **Server Request**
  - [x] Add filter request logic to the server.
- **Filter Component**
  - [x] Add HTML and CSS for the filter component.
- **Load Filtered Projects**
  - [x] Fetch and display filtered projects.

## 10. Like Project

- **Server Methods**
  - [x] Add methods for liking, disliking, and fetching liked projects.
- **Controller Updates**
  - [x] Update controller to handle new methods.
- **User API**
  - [x] Add like, dislike, and getLikedProjects endpoints in the user API.
- **Custom Hook**
  - [x] Create a custom hook for getting liked projects.
- **Projects List**
  - [x] Add like and dislike functionality to the projects list component.

## 11. Wishlist

- **Component Creation**
  - [x] Create a `Wishlist` component.
  - [x] Add HTML and CSS.
- **Fetch Liked Projects**
  - [x] Implement API calls to get liked projects.
- **Display Projects**
  - [x] Load and display projects in the wishlist component.

## 12. Orders

- **Order Model**
  - [x] Define the order model on the server.
- **Order Component**
  - [x] Create an `Orders` component.
  - [x] Add HTML and CSS for displaying orders.
- **Order API**
  - [x] Implement API endpoints for managing orders (create, read, update, delete).
- **Fetch and Display Orders**
  - [x] Fetch orders from the server and display them in the `Orders` component.

## 13. Search

- **Search Component**
  - [x] Create a `Search` component.
- **App Routes**
  - [x] Add a route for search functionality.
- **Search API**
  - [x] Implement an API request for search queries.
- **Custom Hook**
  - [x] Create a custom hook for search functionality.
- **Display Search Results**
  - [x] Load and display search results in the search component.

---
