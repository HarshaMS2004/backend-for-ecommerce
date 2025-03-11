const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');

const router = express.Router();

// PayPal environment setup
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

router.post('/pay', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: req.body.total
            }
        }]
    });

    try {
        const order = await client.execute(request);
        res.json({ orderId: order.result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
