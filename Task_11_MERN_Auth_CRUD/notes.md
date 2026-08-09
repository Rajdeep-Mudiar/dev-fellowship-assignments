Inside server

1. npm init
2. npm i express cors dotenv nodemon jsonwebtoken mongoose bcryptjs nodemailer cookie-parser
3. after changing package.json . We enter
   npm run server --> to run the backend using nodemon

## Each module uses

1. express --> used to create our app
2. cors --> that allows us to connect backend with frontend
3. dotenv --> helps to store env variables
4. nodemon --> helps to restart the backend whenever we make any changes in the code
5. jsonwebtoken --> used to create token for authentication
6. mongoose --> helps to connect with the mongodb database
7. bcryptjs --> used to encrypt the password and save in the database
8. nodemailer --> helps to send emails
9. cookie-parser --> helps to send the cookies to api response

used Brevo SMTP for nodemailer SMTP

Inside client

1. npm create vite@latest
2. give project name
3. Select framework : React
4. Select a variant : JavaScript
5. npm i axios react-router-dom react-toastify

## Each module uses

1. axios --> to make API calls
2. react-router-dom --> to create router in react app
3. react-toastify --> to display notification in our webpage

use rafce snippet to write the basic app.jsx code

We can update index.html to change the icon in the browser tab

we also used google fonts to change the fonts
Outfit font

To install tailwindcss
npm install tailwindcss @tailwindcss/vite

## Folder Brief

1. pages --> This folder will contain different pages of our website

2. components --> This folder will contain all the components

3. context --> This folder will store all the states and functions of our app

Since we are using vite so we have to write VITE at first in .env inside client folder

import.meta.env.env_variable_name --> to import client .env

process.env.env_variable_name --> To get access of environment variable for server folder
