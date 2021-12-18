

# react-around-api-full

The API of "Around the U.S." with authorization and registration handled by the back-end server.
This repository contains the full API of "Around the U.S." project that features user authorization and user registration and handles cards and users.

## Frontend
```
Link to the website https://www.effip24.students.nomoreparties.site/
```
#### Technologies and Techniques

<p align="left"> 
 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="javascript" width="40" height="40"/>

</p>

```bash
  The website is fully responsive and has a design at the following breakpoints

  1024, 768, 425, 320

  BEM, CSS, Flexbox, Grid, JavaScript, ReactJS
```

#### To run the server locally
```
  git clone https://github.com/effip24/react-around-api-full.git
```
```
  cd react-around-api/frontend
```
```
  npm install
```
```
  npm run start
```


## Backend
#### To run the server

```
  git clone https://github.com/effip24/react-around-api-full.git
```
```
  cd react-around-api/backend
```
```
  npm install
```
```
  npm run start
```
#### Link to the API:  https://api.effip24.students.nomoreparties.site

| end point | Description                |
| :-------- | :------------------------- |
| `POST /signin` | authorization |
| `POST /signup` | registration |
| `GET /users` | returns all users |
| `GET /user` | returns specific user |
| `GET /users/me` | returns logged in user |
| `PATCH /users/me` | updates user info |
| `PATCH /users/me/avatar` | updates user's avatar |
| `GET /cards` | returns all cards |
| `POST /cards` | creates new card |
| `DELETE /cards/:cardId` | deletes specific card |
| `DELETE /cards/:cardId/likes` | removes a like from a card |
| `PUT /cards/:cardId/likes` | add a like to a card |




