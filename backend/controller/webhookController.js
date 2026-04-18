import stripe from "../util/stripe.js";
import { processStripeEvent } from "../services/webhookService.js";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handleStripeWebhook = async (req, res) => {

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );

  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  await processStripeEvent(event);

  res.json({ received: true });

};