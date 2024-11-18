to run this project

- run npm install in the root folder
- navigate to the frontend folder and run npm install
- create .env file with the following attributes
    MONGO_URI=
    PORT=5000
    JWT_SECRET=  // choose a jwt secret
    ADMIN_EMAIL=  // you can just choose a mock email
    ADMIN_PASSWORD=  // six digits or more
    NODE_ENV=development
    JWT_LIFETIME=30d
    COOKIE_HOURS_LIFETIME=24  // do not make it equal to zero
    COOKIE_DAYS_LIFETIME=30  // do not make it equal to zero
    MAIL_HOST=  // for sending automated emails, you can skip this feature
    MAIL_USER=  // for sending automated emails, you can skip this feature
    MAIL_PASSWORD=  // for sending automated emails, you can skip this feature

finally run 'npm run dev' and open localhost 5173