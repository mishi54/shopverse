import stripe from "../util/stripe.js";
import { processStripeEvent } from "../services/webhookService.js";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handleStripeWebhook = async (req, res) => {
  console.log("WEBHOOK HIT");
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret,
       300
    );

  } catch (err) {
      console.log("WEBHOOK ERROR:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
console.log("EVENT RECEIVED:", event.type);
  if (event.type === "checkout.session.completed") {
    await processStripeEvent(event);
  }


  res.json({ received: true });

};