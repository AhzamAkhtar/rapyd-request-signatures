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

const express = require('express');
const cors  = require('cors')

const ff=999
const makeRequest = require('./utilities').makeRequest;

const app = express();

app.use(cors())
app.set('json spaces', 4);

app.listen(3005);

app.get('/country', async (req, res) => {

    try {
        const result = await makeRequest('GET', '/v1/payment_methods/country?country=us');
    
        res.json(result);
      } catch (error) {
        res.json(error);
      }

})

app.get('/payment', async (req, res) => {

    try {
        const body = {
            amount: req.query.amount,
            currency: 'MXN',
            payment_method: {
                type: 'mx_diestel_cash'
            }
        };
        const result = await makeRequest('POST', '/v1/payments', body);
        res.json(result);
    } catch (error) {
        res.json(error);
    }

})



app.get('/complete' , async (req,res)=>{
    try{
        const body = {
            token: "payment_3c5cce8d1a81770ab170ced1fdb27eb7",
        }
    const result = await makeRequest('POST', '/v1/payments/completePayment', body);
    res.json(result)
     } catch(error){
        res.json(error)
    }
})

