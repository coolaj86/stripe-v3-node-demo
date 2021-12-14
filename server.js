"use strict";

let Http = require("http");
let express = require("express");
let app = express();
// This is a public sample test API key.
// To avoid exposing it, don't submit any personally identifiable information through requests with this API key.
// Sign in to see your own test API key embedded in code samples.
let stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

app.use(express.static("public"));
app.use(express.json());

let calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

app.post("/api/create-payment-intent", async (req, res) => {
    let { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    let paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

let server = Http.createServer(app);
server.listen(4242, '127.0.0.1', function () {
    console.log("Node server listening on", server.address());
});
