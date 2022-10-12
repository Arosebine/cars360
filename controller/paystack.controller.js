const paystackModels = require('../database/postgresql');
const Donor = paystackModels.donor;
const _ = require('lodash');
const { initializePayment, verifyPayment } = require('../utils/paystack.transact');






exports.paystackIniate = async (req, res) => {
   try {
     const form = _.pick(req.body,['amount', 'email', 'full_name' ]);
    form.metadata = {
        full_name : form.full_name,     
        amount: form.amount,
        email: form.email,
    }
    form.amount *= 100;
    await initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return;
       }
       response = JSON.parse(body);
       res.status(200).json(body)
    });
   } catch (error) {
    console.log(error);
   }
};



exports.paystackVerify = async (req,res) => {
    try {
        const ref = req.query.reference;
    await verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);
        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);
        [reference, amount, email, full_name] = data;
        newDonor = {reference, amount, email, full_name}
        const donor = new Donor(newDonor)
        donor.save().then((donor)=>{
            if(donor){
                res.redirect('/receipt/'+donor._id);
            }
        }).catch((e)=>{
            res.redirect('/error');
        })
    })
    } catch (error) {
        console.log(error);
    }
};