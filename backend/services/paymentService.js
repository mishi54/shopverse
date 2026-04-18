import stripe from "../util/stripe.js";

export const createStripeSession = async (order) => {

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],

    mode: "payment",

    line_items: order.items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.images
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    })),

    metadata: {
      orderId: order._id.toString()
    },

    success_url: `${process.env.CLIENT_URL}/success`,

    cancel_url: `${process.env.CLIENT_URL}/cancel`

  });

  return session;

};