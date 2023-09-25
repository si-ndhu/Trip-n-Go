// Author: Abhishek Bhatt
var express = require('express');
var router = express.Router();
const { sendNotification } = require("../conn");
const stripe = require("stripe")(process.env.SECRET_KEY);

router.post("/", async (req, res) => {
  const host = req.get("origin");
  const { amount, packageName, userId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: packageName,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: host,
      cancel_url: `${host}/payment`,
    });

    const notificationPayload = {
      userId,
      title: 'Payment Started',
      description: `Your payment for the ${packageName} package has been started successfully.`,
      payload: {
        type: 'payment',
        data: {
          amount,
          packageName,
        }
      }
    };

    sendNotification(notificationPayload);

    //sendNotification(notificationPayload);
    res.status(200).json({
      success: true,
      message: "Operation successful",
      data: { link: session.url }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Stripe session"
    });
  }
});
module.exports = router;


