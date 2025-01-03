import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { getRequest, postRequest } from "@/lib/axiosInstance";
import { ApiResponse, ApiResponseError } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { BillingCard, Tier } from "./components/BillingCard";
import { useState } from "react";
import { useToastHandlers } from "@/hooks/useToaster";
import { CreateSubscription } from "./layouts/CreateSubscription";
import { ChangeSubscription } from "./layouts/ChangeSubscription";

export const tiers = [
  {
    name: "basic",
    id: "price_1Qc2tCAKPicG7yG3ZTPIBODd",
    href: "#",
    priceMonthly: "$450",
    amount: 450,
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "AI assistance",
      "3 projects",
      "Unlimited experts",
      "All opportunities",
      "Export to .docx",
    ],
    featured: false,
  },
  {
    name: "premium",
    id: "price_1Qc2tjAKPicG7yG3UodEJTPF",
    href: "#",
    priceMonthly: "$750",
    amount: 750,
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "AI assistance",
      "5 projects",
      "Unlimited experts",
      "Export to .docx",
      "All opportunities",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    id: "price_1Qc2uFAKPicG7yG3kUP5CDf8",
    href: "#",
    priceMonthly: "$1500",
    amount: 1500,
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Everything in business",
      "7 projects",
      "All opportunities",
      "Alert system",
      "Personalized plan with experts",
    ],
    featured: false,
  },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface SubscriptionResponse {
  status: boolean;
  data: Data;
}

export interface Data {
  id: number;
  subscription_id: string;
  subscription_status: string;
  subscription_plan: null;
  subscription_amount: number;
  subscription_price_id: string;
  subscription_start_date: Date;
  subscription_end_date: Date;
  created_at: Date;
  updated_at: Date;
  user: number;
}

export default function Billing() {
  const { data, error, isPending } = useQuery<
    ApiResponse<SubscriptionResponse>,
    ApiResponseError
  >({
    queryKey: ["subscription"],
    queryFn: async () => await getRequest(`billing/subscription/`),
  });

  return isPending ? (
    <div className="flex items-center justify-center h-full">
      <Spinner />
    </div>
  ) : error?.response?.data.message === "No active subscription found!" ? (
    <CreateSubscription />
  ) : (
    <ChangeSubscription
      {...{ subscriptionPriceId: data?.data.data.subscription_price_id ?? "" }}
    />
  );
}
