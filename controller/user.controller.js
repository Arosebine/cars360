const axios = require('axios');
const accessToken = new Set();
const User  = require('../models/usermongo.model');



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