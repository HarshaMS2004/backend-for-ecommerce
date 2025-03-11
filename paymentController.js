const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const router = express.Router();
require('dotenv').config();

// PayPal Configuration
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// 🛒 Create PayPal Order
router.post('/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: req.body.total, // Total from frontend
                },
            },
        ],
    });

    try {
        const order = await client.execute(request);
        res.json({ id: order.result.id }); // Return PayPal Order ID
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Capture PayPal Payment
router.post('/capture-order', async (req, res) => {
    const { orderID } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        res.json({ status: capture.result.status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
