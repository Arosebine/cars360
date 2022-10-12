




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





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



exports.loginAuth = (req, res) => {
  res.send(`
    <html>
      <body>
        <a href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&r
edirect_uri=${encodeURIComponent('http://localhost:3479/index')}">
          Log In With Facebook
        </a>
      </body>
    </html>
  `);
};


// Route 2: Exchange auth code for access token
exports.loginVerify= async (req, res) => {
  try {
    const authCode = req.query.code;

    const accessTokenUrl = 'https://graph.facebook.com/v6.0/oauth/access_token?' +
      `client_id=${process.env.FACEBOOK_APP_ID}&` +
      `client_secret=${process.env.FACEBOOK_SECRET_KEY}&` +
      `redirect_uri=${encodeURIComponent('http://localhost:3479/oauth-redirect')}&` +
      `code=${encodeURIComponent(authCode)}`;

    const accessToken = await axios.get(accessTokenUrl).then(res => res.data['access_token']);

    // Store the access token in MongoDB, skip the userId for now
    await User.create({ _id: accessToken });

    res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true });
    res.redirect(`/me?accessToken=${encodeURIComponent(accessToken)}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
};




// Route 3: Make requests to FB on behalf of the user
exports.userRequest = async (req, res) => {
  try {
    const accessToken = String(req.cookies.accessToken);
    // Make sure the token is in the database
    const tokenFromDb = await User.findOne({ _id: accessToken });
    if (tokenFromDb == null) {
      throw new Error(`Invalid access token "${accessToken}"`);
    }

    const data = await axios.get(`https://graph.facebook.com/me?access_token=${encodeURIComponent(accessToken)}`).
      then(res => res.data);

    return res.send(`
      <html>
        <body>Your name is ${data.name}</body>
      </html>
    `);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
};




/////////////////////////////////////////////////////////
How to generate code
//////////////////////////////////////////////////////////
let codeGenerate = Math.random().toString(36).substring(2,7);