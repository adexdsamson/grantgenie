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
import { getRequest } from "@/lib/axiosInstance";
import { useLazyQuery } from "@/hooks/useLazyQuery";
import { ApiResponse, ApiResponseError, PitchFlowResponse } from "@/types";
import { useNavigate } from "react-router-dom";

type ReportProps = {
  id: number;
  category: "grant" | "visa";
};

export const ReportDialog = ({ id, category }: ReportProps) => {
  const navigate = useNavigate();
  const [isPitch, setIsPitch] = useState(false);
  const [isProposal, setIsProposal] = useState(false);

  const [fetchQuery, query] = useLazyQuery<
    unknown,
    ApiResponse<PitchFlowResponse>,
    ApiResponseError
  >(
    ["pitch-flow", id],
    async () => await getRequest(`grants/pitchflows/?project_id=${id}`)
  );

  const handlePitchStatus = async () => {
    try {
      const res = await fetchQuery();

      if (!res.data) {
        return;
      }

      if (!res.data.signature_confirmed) {
        setIsPitch(true);
        return;
      }

      if (!res.data.payment_confirmed) {
        console.log("load up the payment url");
        return;
      }

      navigate(`/dashboard/projects/${res.data.id}/welcome`);
    } catch (error) {
      console.log("err: ", error);
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
              isLoading: query.isLoading,
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
