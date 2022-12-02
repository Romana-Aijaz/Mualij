const stripe = require('stripe')("sk_test_51L5ah3HGD1qyTXcMRvKuaD7FaPHwyrVIZ2XzHDWArriurjOTqT2w90BdxlLb6OPjT2GCaj16soe0RpQb5kei5Fcr00Ux7bfDl4")
const uuid = require("uuidv4");
const router = require('express').Router();
const path = require('path');

router.get("/" , (req, res) => {
   res.sendFile(path.join(__dirname, "./payment.html"));
})

router.post("/charge" , async (req, res) => {
    console.log("token: " +req.body.token)
    console.log("session: " +req.body.session);
    const {session, token} = req.body;
    console.log("Session", session);
    //console.log("Price", session.price);

    //This is a unique key. Which makes sure that the same user is not charged twice.
    const idempotencyKey = uuid;

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: session.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: session.name
        },{idempotencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})
router.get("/home" , (req, res) => {
    res.render('Home' , {
        key: publishableKey
    })
})

module.exports = router;