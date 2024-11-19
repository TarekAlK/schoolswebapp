to run this project

- run npm install in the root folder
- navigate to the frontend folder and run npm install
- create .env file and include the following
    - MONGO_URI=  // your mongodb uri
    - PORT=5000
    - JWT_SECRET=abc123  // choose a jwt secret
    - ADMIN_EMAIL=example@gmail.com  // you can just choose a mock email
    - ADMIN_PASSWORD=123321  // six digits or more
    - NODE_ENV=development
    - JWT_LIFETIME=30d
    - COOKIE_HOURS_LIFETIME=24  // do not make it equal to zero
    - COOKIE_DAYS_LIFETIME=30  // do not make it equal to zero
    - MAIL_HOST=  // for sending automated emails feature
    - MAIL_USER=  // for sending automated emails feature
    - MAIL_PASSWORD=  // for sending automated emails feature

finally run 'npm run dev' in the root folder and open localhost 5173