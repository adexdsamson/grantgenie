import { Button } from "@/components/ui/button";
import { cn as classNames } from "@/lib/utils";
import { Check } from "lucide-react";

export type Tier = {
  name: string;
  id: string;
  href: string;
  amount: number;
  priceMonthly: string;
  description: string;
  features: string[];
  featured: boolean;
};

type BillingCardProps = {
  tier: Tier;
  index: number;
  isLoading: boolean;
  onClick: (data: Tier) => void;
  onCancel?: (data: Tier) => void;
  active?: boolean;
};

export const BillingCard = ({
  tier,
  index,
  isLoading,
  onClick,
  onCancel,
  active,
}: BillingCardProps) => {
  return (
    <div
      key={tier.id}
      className={classNames(
        tier.featured
          ? "relative bg-primary shadow-2xl"
          : "bg-white/60 sm:mx-8 lg:mx-0",
        tier.featured
          ? ""
          : index === 0
          ? "sm:rounded-b-none lg:rounded-3xl"
          : "sm:rounded-t-none lg:rounded-3xl",
        "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
      )}
    >
      <h3
        id={tier.id}
        className={classNames(
          tier.featured ? "text-[#BCBDD3]" : "text-primary",
          "text-base/7 font-semibold"
        )}
      >
        {tier.name}
      </h3>
      <p className="mt-4 flex items-baseline gap-x-2">
        <span
          className={classNames(
            tier.featured ? "text-white" : "text-gray-900",
            "text-5xl font-semibold tracking-tight"
          )}
        >
          {tier.priceMonthly}
        </span>
        <span
          className={classNames(
            tier.featured ? "text-gray-400" : "text-gray-500",
            "text-base"
          )}
        >
          /month
        </span>
      </p>
      <p
        className={classNames(
          tier.featured ? "text-gray-300" : "text-gray-600",
          "mt-6 text-base/7"
        )}
      >
        {tier.description}
      </p>
      <ul
        role="list"
        className={classNames(
          tier.featured ? "text-gray-300" : "text-gray-600",
          "mt-8 space-y-3 text-sm/6 sm:mt-10"
        )}
      >
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <Check
              aria-hidden="true"
              className={classNames(
                tier.featured ? "text-indigo-400" : "text-indigo-600",
                "h-6 w-5 flex-none"
              )}
            />
            {feature}
          </li>
        ))}
      </ul>
      {active && (
        <Button
          isLoading={isLoading}
          onClick={() => onCancel?.(tier)}
          variant={"destructive"}
          className="w-full mt-3"
        >
          Cancel
        </Button>
      )}
      {!active && (
        <Button
          isLoading={isLoading}
          onClick={() => onClick(tier)}
          variant={tier.featured ? "secondary" : "outline"}
          className="w-full mt-3"
        >
          {!active ? "Change plan" : "Subscribe"}
        </Button>
      )}
    </div>
  );
};
