import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },

      images: [{ type: String, required: true }],
      },
    ],

    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    taxPrice: {
      type: Number,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Stripe", "JazzCash", "EasyPaisa"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    transactionId: {
      type: String,
    },

    paidAt: {
      type: Date,
    },
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String },
      country: { type: String, default: "Pakistan" },
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    shippedAt: {
      type: Date,
    },

    deliveredAt: {
      type: Date,
    },

    cancelledAt: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);