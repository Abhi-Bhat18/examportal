# examportal
This is an exam portal  web application

This is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack that allows users to register for available exams and manage the registration and admin to create, delete and view the candidates registered for the exam.

https://user-images.githubusercontent.com/86356896/226447612-2be850bb-eba5-40ba-a767-55f9c2ecfaca.mp4


## Features
* User email verification.
* User authentication and authorization using JWT tokens.
* User profile page to manage registrations.
* Admin page to manage exams and registrations.
* Responsive design for optimal viewing on any device.

## Installation

To run the application locally, you'll need to have Node.js and MongoDB installed on your machine. Once you've cloned the repository, navigate to the project directory in your terminal and run the following commands:

For frontend 
```
cd frontend
npm install 
```
For backend
```
cd api
npm install
```
This will install the required dependencies for both the client and server applications.

Next, create a .env file in the api directory with the following environment variables:
```
PORT = 1337
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

EMAIL = "<your-email-address>"
EMAIL_PASSWORD = "<your-email-password>"

CAPTCHA_SITE_KEY = "<captcha-sitekey>"
CAPTCHA_SECRET_KEY = "<captcha-secretKey>"
```
Note:Register your site in for [reCaptcha](https://www.google.com/recaptcha/admin/create) and get the site and secret key

Finally, start the client and server applications with the following commands:
Frontend
```
cd frontend
npm run dev
```
API
```
cd api
node server.js
```
The client application will be available at http://localhost:5173, and the server will be running on http://localhost:1337.
