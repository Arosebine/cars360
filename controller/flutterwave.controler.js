const Flutterwave = require('flutterwave-node-v3');
const paystackModels = require('../database/postgresql');
const Donor = paystackModels.donor;


const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

exports.flwtransact = async (req, res) => {
    // Initiating the transaction
const payload = {
    "card_number": "5531886652142950",
    "cvv": "564",
    "expiry_month": "09",
    "expiry_year": "21",
    "currency": "NGN",
    "amount": "100",
    "redirect_url": "https://www.google.com",
    "fullname": "Flutterwave Developers",
    "email": "developers@flutterwavego.com",
    "phone_number": "09000000000",
    "enckey": process.env.FLW_ENCRYPTION_KEY,
    "tx_ref": "example01"

}

    try {
        const response = await flw.Charge.card(payload)
        console.log(response)

        // Authorizing transactions

        // For PIN transactions
        if (response.meta.authorization.mode === 'pin') {
            let payload2 = payload
            payload2.authorization = {
                "mode": "pin",
                "fields": [
                    "pin"
                ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)

            // Add the OTP to authorize the transaction
            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            })
            console.log(callValidate)

        }
        // For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
        if (response.meta.authorization.mode === 'redirect') {

            var url = response.meta.authorization.redirect
            open(url)
        }

        console.log(response)


    } catch (error) {
        console.log(error)
    }

};




 exports.payCallback = async (req, res) => {
    if (req.query.status === 'successful') {
        const transactionDetails = await Transaction.find({ref: req.query.tx_ref});
        const response = await flw.Transaction.verify({id: req.query.transaction_id});
        if (
            response.data.status === "successful"
            && response.data.amount === transactionDetails.amount
            && response.data.currency === "NGN") {
            // Success! Confirm the customer's payment
        } else {
            // Inform the customer their payment was unsuccessful
            
        }
    }};