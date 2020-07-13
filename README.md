
<h1 align="center">📝 Blog </h1> 

<p align="center">
  <a href="#execution">View project execution</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;  
  <a href="#heroku">Project hosted at heroku</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies Used</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#dependencies">Dependencies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#run">Run the project locally</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">license</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=7159c1&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=000000">
</p>

<br>

## :books: About

<p align="justify">
A simple blog, where each post has a category.

The site login is encrypted, both for users and administrators. So, depending on the user who logs in, certain functionality will not be allowed. The following features are allowed for each profile.
</p>


User profile
- Home
- Sign up
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


<a id="execution"></a><br>

## :eyes: View project execution

![video](https://github.com/RuthMaria/blogApp/blob/master/.github/video.gif)


<a id="heroku"></a><br>

## :anchor: Project hosted at heroku

Access the blog by clicking [here](https://aqueous-fjord-54281.herokuapp.com/)

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

<a id="run"></a><br>

## :gear: Run the project locally

### Requirements
- [MongoDB](https://www.mongodb.com/try/download/community)
- [NodeJS in its LTS version](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download)

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

- In CMD, boot the mongoDB server

``` 
mongod    
```

- In another CMD window:

```
mongo                     // initializes the database
CREATE DATABASE blogapp  // Create the database
use blogapp             // choose the database
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