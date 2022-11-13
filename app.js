/**
 * Rapyd Integrations: Request Signature.
 *
 * This app implements the Rapyd's API request signature. The crypto-js library
 * is required (https://www.npmjs.com/package/crypto-js). To install it, run:
 *
 * npm install crypto-js
 *
 * @link   https://docs.rapyd.net/
 * @file   This files defines the main node.js application.
 * @author Isaac Benitez.
 * @version 0.0.1
 *
 * @requires express
 * @requires https
 * @requires crypto-js
 */

const express = require("express");
const cors = require("cors");

const ff = 999;
const makeRequest = require("./utilities").makeRequest;

const app = express();

app.use(cors());
app.set("json spaces", 4);

app.listen(3005);

app.get("/country", async (req, res) => {
  try {
    const result = await makeRequest(
      "GET",
      "/v1/payment_methods/country?country=us"
    );

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.get("/payment", async (req, res) => {
  try {
    const body = {
      amount: req.query.amount,
      currency: "MXN",
      description: "Payment method token",
      receipt_email: req.query.receipt_email,
      address: {
        name:req.query.name,
        line_1:req.query.line_1,
      },
      payment_method: {
        type: "mx_diestel_cash",
      },
    };
    const result = await makeRequest("POST", "/v1/payments", body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.get("/complete", async (req, res) => {
  try {
    const body = {
      token: req.query.token,
    };
    const result = await makeRequest(
      "POST",
      "/v1/payments/completePayment",
      body
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.get("/delete", async (req, res) => {
  try {
    const result = await makeRequest(
      "DELETE",
      "/v1/payments/payment_5c10eb9eb03a62c2054f503104cd295a"
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.get("/update" , async (req,res) =>{
  try{
    const body = {
      receipt_email: "newnewabc@gmail.com",
    };
    const result = await makeRequest("POST" , "/v1/payments/payment_37b590436f29d85495de1a63a704db22" , body)
    res.json(result)
  }
  catch(error){
    res.json(error)
  }
})

app.get("/retrive" , async (req,res) =>{
  try{
    const result = await makeRequest("POST" , "/v1/payments/payment_37b590436f29d85495de1a63a704db22")
    res.json(result)

  }
  catch(error){
    res.json(error)
  }
})