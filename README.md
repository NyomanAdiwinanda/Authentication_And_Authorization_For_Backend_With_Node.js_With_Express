# Authentication and Authorization Quick Template for Backend with Node.Js
This repository contains files template if you want to quick setup for user authentication and authorization in your server side scripting 
using Node.Js with Express.js, and PostgresQL with Sequelize ORM.

To make the files work properly, first in your newly-created project folder you need to:

1. Initialize node package manager in your project
```
npm init -y
```

2. install these dependencies in your project
```
npm install express pg sequelize bcryptjs jsonwebtoken dotenv cors
```

3. initialize Sequelize
```
npx sequelize init
```

4. Generate User model in your sequelize
```
npx sequelize model:generate --name User --attributes email:string,password:string
```

5. Copy and paste this repository folders and files into your project.

6. Rename `.env.example` to `.env` and add your own `SECRET_KEY` value

7. And finally you can continue working with your other REST API