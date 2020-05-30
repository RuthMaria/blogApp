# Blog 

A simple blog, where each post has a category.

The site login is encrypted, both for users and administrators. So, depending on the user who logs in, certain functionality will not be allowed. The following features are allowed for each profile.


User profile
- Create an account
- Login
- Log out
- Access all posts
- Access the list of categories
- Access posts of each category

Admin profile
- All user profile functionality
- Access to CRUD (Create, Read, Update and Delete) of posts
- Access to categories CRUD

This project is part of my nodeJS studies, based on the [Youtube course] (https://www.youtube.com/playlist?list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B).


## Project hosted at heroku

Access the blog by clicking [here] (https://aqueous-fjord-54281.herokuapp.com/)


## Run the project locally

### Requirements
- MongoDB
- NodeJS in its LTS version
- Visual Studio Code

### Commands

- Clone this repository

```
git clone https://github.com/RuthMaria/blogApp.git
```

- Install all the dependencies indicated in the package.json

```
npm install 
```

-  Comment on this [line] (https://github.com/RuthMaria/blogApp/blob/master/routes/user.js#L42), if you want to test the user profile

- Create the database

```
CREATE DATABASE blogapp
```

- Initialize mongoDB in CMD

```
mongod
```

- Run the project

```
nodemon app.js
```

- Type the URL in the browser

```
https://localhost:8080
```

- Create an administrator account and log in to the blog

