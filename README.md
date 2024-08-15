1. Initialize React App

2. Create Home Page

   - create header
     - add html
     - add css
   - add home image
     - add html
     - add css

3. Projects List Page

- add hardcore html and css
- load projects from server

4. Projects Details Page

- add hardcore html and css
- load project from server
  - add projects api
- add comments section
  - add html and css
  - add comments api

5. Create Server Side

- add projects in server collection
- create api folder
  - create requester file

6. Authentication

- create custom hooks

  - add useForm
  - add useAuth

- login

  - create login component
  - add login api
  - handle validation and errors

- register

  - create register component
  - add register api
  - handle validation and errors

- logout

  - create logout component
  - add logout api
  - add authorization in requester

- add route guards

7. Refacturing

- extract auth state from app component
- persist auth state
- migrate from softuni practice server to mongoDB own server
  - create src in server folder
  - add server.ts
  - add routes
  - add controllers, models and services

8. Profile page

- add html and css
- load dynamic information
- add update and delete functionalities

9. Filter projects

- add category to project model
- preseed new projects
- add filter request to server
- add filter in projects-api
- add html and css for filter component
- load filtered projects

10. Like Project

- add methods in server services
  - add like
  - add dislike
  - add getLikedProjects
- add them in controller
- add like, dislike and getLikedProjects in user-api
- make getLikedProjects as custom hook
- add functionality in projects-list component
