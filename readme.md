




Car360 is a platform that helps users to rent cars online. 
Write an endpoint that has the features listed below. 
Authentication and authorization should be handled with Oauth2 using Authorization code grant types, 
MongodB to store users' data and PostgreSQL to store other data.
  
Host your Postgres database on Heroku.  


Features to build: 

1.Authenticate users with Oauth2 and social login (Facebook) 
2.Create an endpoint to upload new available cars for anyone with “ROLE_ADMIN” 
3.Create an endpoint to fetch available cars from the database only 5 per time (Add 20 dummy data to test) 
4. Create an endpoint to make payment for the car bookings and pay using Paystack. 

On successful payment, generate your own personal receipt and put all details (Should be pdf). 
Calculate total price using number of days and amount   


Data to take for cars are name, year, manufacturer, 4 images (nothing less), number of days and amount to rent it out for per day




So we are going to start with baby steps:

i. Setting up Node.js

ii. Installing the needed Node.js packages for the project

iii. Setting up the MongoDB database model using mongoose

iv. Building our own paystack payment module

v. Setting up express server: app.js

    a. Views using pug template engine
    b. Creating endpoints for payment and confirmation
    c. Testing Rents


Stacks:
express,
sequelize,
request,
body-parser,
ejs,
mongoose,
pg
