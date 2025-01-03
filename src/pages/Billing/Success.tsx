import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function BillingSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 space-y-4 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-2">
        <CircleCheckIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Payment successful
        </h1>
        <p className="max-w-[600px] text-center text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          Your subscription has been confirmed and is now being processed. We
          hope you enjoy your stay.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Link to="/dashboard/billing">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
