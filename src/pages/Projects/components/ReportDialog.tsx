import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectTypeCard } from "./ProposalCard";
import { SignatureDialog } from "./Signature";
import { useState } from "react";
import { postRequest } from "@/lib/axiosInstance";
import { ApiResponse, ApiResponseError, PitchFlowResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

type ReportProps = {
  id: number;
  projectId?: string;
  category: "grant" | "visa";
  payment_confirmed: boolean;
  signature_confirmed: boolean;
};

export const ReportDialog = ({
  id,
  category,
  projectId,
  payment_confirmed,
  signature_confirmed,
}: ReportProps) => {
  const [isPitch, setIsPitch] = useState(false);
  const [isProposal, setIsProposal] = useState(false);

  const checkoutMutation = useMutation<
    ApiResponse<{ status: boolean; message: string; data: { url: string } }>,
    ApiResponseError
  >({
    mutationFn: async () =>
      await postRequest("grants/pitchflows/payment-checkout/", {
        success_url: `http://localhost:5173/dashboard/projects/${projectId}/welcome?projectId=${id}`,
      }),
    onSuccess(data) {
      window.open(data.data.data.url, "_self");
    },
  });

  const handlePitchStatus = async () => {
    if (!signature_confirmed) {
      setIsPitch(true);
      return;
    }

    if (!payment_confirmed) {
      checkoutMutation.mutate();
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ProjectTypeCard
          {...{
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a2328b2c77bb6d89d84dfa0f5a26ed5bee01218709024724ca49867929f2a42?placeholderIfAbsent=true&apiKey=877fbded3c1141a18415be7a6b510b08",
            title: "Grants and Contracts",
            description:
              "Enhances the grant application process for startups and businesses",
            isSelected: true,
          }}
        />
      </DialogTrigger>
      <DialogContent className="max-w-none w-[28rem]">
        <DialogHeader>
          <DialogTitle>Choose report</DialogTitle>
          <DialogDescription>
            Select report type to required for the agency.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3">
          <SignatureDialog
            {...{
              id,
              open: isPitch,
              title: "Pitch",
              onOpen: setIsPitch,
              description:
                "A Pitch report will be generated for you after completing all questions.",
              category,
              onTrigger: handlePitchStatus,
            }}
          />

          <SignatureDialog
            {...{
              id,
              title: "Proposal",
              description:
                "A Proposal report will  be generated for you after completing all questions",
              category,
              open: isProposal,
              onOpen: setIsProposal,
              onTrigger() {},
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
