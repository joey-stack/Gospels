import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia" as any,
      typescript: true,
    })
  : null;

export const isStripeConfigured = Boolean(
  process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith("sk_")
);
