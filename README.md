
<h1 align="center">📝 Blog </h1> 

## :information_source: Índice
- [About](#about)
- [Technologies Used](#technologies)
- [Dependencies](#dependencies)
- [Project hosted at heroku](#heroku)
- [Run the project locally](#run)
- [How to contribute](#contribute)
- [License](#license)


<a id="about"></a><br>

## :books: About

<p align="justify">
A simple blog, where each post has a category.

The site login is encrypted, both for users and administrators. So, depending on the user who logs in, certain functionality will not be allowed. The following features are allowed for each profile.
</p>


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

This project is part of my nodeJS studies, based on the [Youtube course](https://www.youtube.com/playlist?list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B). 

<a id="technologies"></a><br>

## :computer: Technologies Used
 * HTML
 * CSS
 * JavaScript
 * Node.js
 * MongoDB
 * Express
 * Bootstrap
 * Template engine Handlebars

<a id="dependencies"></a><br>

 ## :beginner: Dependencies
  * Bcryptjs
  * Body-parser
  * Connect-flash
  * Express
  * Express-handlebars
  * Express-session
  * Moment
  * Mongoose
  * Passport
  * Passport-local 

<a id="heroku"></a><br>

## :anchor: Project hosted at heroku

Access the blog by clicking [here](https://aqueous-fjord-54281.herokuapp.com/)

<a id="run"></a><br>

## :gear: Run the project locally

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

-  Comment on this [line](https://github.com/RuthMaria/blogApp/blob/master/routes/user.js#L42), if you want to test the user profile

- Create the database

```
CREATE DATABASE blogapp
```

- Initialize mongoDB in CMD

```
mongod
```

In other CMD, write:

```
mongo
use blogapp
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

<a id="contribute"></a><br>

## :recycle: How to contribute

- Fork this repository,
- Create a branch with your feature: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'feat: My new feature'`
- Push your branch: `git push origin my-feature`

<a id="license"></a><br>

## :memo: License

This project is under the MIT license. See the  file [LICENSE](LICENSE.md) for more details.

---

<h4 align="center">
    Developed with 💜 by <a href="https://www.linkedin.com/in/ruth-maria-9b256071/" target="_blank">Ruth Maria</a>
</h4>