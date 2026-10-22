import { loadStripe, Stripe as StripeClient } from "@stripe/stripe-js";

let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  if (!stripePromise && publishableKey) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
