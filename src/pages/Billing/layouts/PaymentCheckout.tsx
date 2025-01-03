import { Button } from "@/components/ui/button";
import { useToastHandlers } from "@/hooks/useToaster";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { error: onError } = useToastHandlers();
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
  
      if (elements == null || stripe === null) {
        return;
      }
  
      setIsLoading(true);
  
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        // Show error to your customer
        onError(submitError.message ?? "");
        return;
      }
  
      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${
            import.meta.env.VITE_APP_BASE_URL
          }/dashboard/billing/success`,
        },
      });
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setIsLoading(false);
        onError(error.message ?? "");
      } else {
        setIsLoading(false);
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
        <PaymentElement />
        <Button
          isLoading={isLoading}
          className="w-full"
          type="submit"
          disabled={!stripe || !elements}
        >
          Subscribe
        </Button>
      </form>
    );
  };
  
  export const PaymentCheckout = ({
    amount = 0,
    clientSecret,
  }: {
    amount: number;
    clientSecret: string;
  }) => {
    const stripePromise = loadStripe(
      "pk_test_51MA8WWAKPicG7yG3vI83oaJq46d4dPBkrioSxvt1WrxGm3lCxrbHji3tqwbs24oUvTemQu29WikkU3W3YHQmqTaO00hDRvoOgc"
    );
  
    const options: StripeElementsOptions = {
      amount,
      currency: "usd",
      mode: "subscription",
      // Fully customizable with appearance API.
      appearance: {
        /*...*/
      },
    };
  
    return (
      <Elements {...{ stripe: stripePromise, options }}>
        <CheckoutForm {...{ clientSecret }} />
      </Elements>
    );
  };
  