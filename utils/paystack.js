// const paystack = require('paystack')('secret_key');



const paystack = require("paystack-api")({
  KEY: process.env.PAYSTACK_SECRET_KEY
}); 


// paystack.{resource}.{method}
  paystack.customer
    .list()
    .then(function (body) {
      console.log(body);
    })
    .catch(function (error) {
      console.log(error);
    });
  
   paystack.transactions.list({ perPage: 20 }).then(function (error, body) {
    console.log(error);
    console.log(body);
  }); 


  module.exports = paystack;