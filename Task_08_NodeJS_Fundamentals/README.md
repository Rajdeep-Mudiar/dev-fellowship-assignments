## Learnings

npm init --> creates a package.json to run the node server
node index --> to run the index.js present in tht directory

console.log(process)
console.log(global)

With ES module we have to add .js extension while importing
But with commonJs we dont have to add .js extension while importing

npm i -D nodemon --> to install nodemon as dev dependency

### To Run continously and also include .env file

"scripts": {
"start": "nodemon --env-file=.env 03_http_module_create_server/server.js"
},

process.env.env_variable_name --> To get access of environment variable

import fs from 'fs/promises'

**filename -->
**dirname -->
