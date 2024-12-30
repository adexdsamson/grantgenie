import { Check } from "lucide-react";

const tiers = [
  {
    name: "Premium",
    id: "tier-hobby",
    href: "#",
    priceMonthly: "$450",
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
    name: "Business",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$750",
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
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$1500",
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Billing() {
  return (
    <div className="relative isolate bg-white px-6 sm:py-10 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      ></div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-primary">Pricing</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features to
        achieve your goals, or find funds for your business.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
        {tiers.map((tier, tierIdx) => (
          <BillingCard {...{ tier, index: tierIdx }} />
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
  );
}

type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
  featured: boolean;
};

const BillingCard = ({ tier, index }: { tier: Tier; index: number }) => {
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
      <a
        href={tier.href}
        aria-describedby={tier.id}
        className={classNames(
          tier.featured
            ? "bg-[#BCBDD3] shadow-sm hover:bg-[#BCBDD3] focus-visible:outline-primary"
            : "text-primary ring-1 ring-inset ring-primary hover:ring-primary focus-visible:outline-primary",
          "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
        )}
      >
        Subscribe
      </a>
    </div>
  );
};
