import { useState } from "react";
import { BillingCard, Tier } from "../components/BillingCard";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse, ApiResponseError } from "@/types";
import { deleteRequest, postRequest } from "@/lib/axiosInstance";
import { tiers } from "..";
import { PaymentCheckout } from "./PaymentCheckout";

export const ChangeSubscription = ({
  subscriptionPriceId,
}: {
  subscriptionPriceId: string;
}) => {
  const [paymentDetails, setPaymentDetails] = useState<
    (Subscription & Tier) | null
  >(null);

  const { mutate, isPending, variables } = useMutation<
    ApiResponse<CreateSubscriptionTypes>,
    ApiResponseError,
    Tier
  >({
    mutationFn: async (payload) =>
      await postRequest("billing/subscription/change/", {
        price_id: payload.id,
      }),
    onSuccess(data, variables) {
      if (!data.data.status) return;
      setPaymentDetails({
        client_secret: data.data.data.client_secret,
        subscription_id: data.data.data.subscription_id,
        ...variables,
      });
    },
  });

  const cancelMutation = useMutation<
    ApiResponse<CreateSubscriptionTypes>,
    ApiResponseError,
    Tier
  >({
    mutationFn: async () => await deleteRequest("billing/subscription/cancel/"),
    onSuccess(data, variables) {
      if (!data.data.status) return;
      setPaymentDetails({
        client_secret: data.data.data.client_secret,
        subscription_id: data.data.data.subscription_id,
        ...variables,
      });
    },
  });

  return (
    <>
      {paymentDetails === null ? (
        <div className="relative isolate bg-white px-6 sm:py-10 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          ></div>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base/7 font-semibold text-primary">Pricing</h2>
            <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Upgrade or cancel your existing plan
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
            Choose an affordable plan that’s packed with the best features to
            achieve your goals, or find funds for your business.
          </p>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
            {tiers.map((tier, tierIdx) => (
              <BillingCard
                {...{
                  tier,
                  index: tierIdx,
                  onClick: mutate,
                  onCancel: cancelMutation.mutate,
                  active: tier.id === subscriptionPriceId,
                  isLoading:
                    (isPending && tier.id === variables.id) ||
                    (cancelMutation.isPending &&
                      cancelMutation.variables.id === tier.id),
                }}
              />
            ))}
          </div>

          <div className="mt-10">
            <p className="text-center text-sm">
              Looking to generate more than 7 projects, contact us{" "}
              <a href="mailto:info@autogon.ai" className="text-blue-700">
                here
              </a>
            </p>
          </div>
        </div>
      ) : (
        <PaymentCheckout
          {...{
            amount: paymentDetails.amount,
            clientSecret: paymentDetails.client_secret,
          }}
        />
      )}
    </>
  );
};

export interface CreateSubscriptionTypes {
  status: boolean;
  data: Subscription;
  message: string;
}

export interface Subscription {
  subscription_id: string;
  client_secret: string;
}
