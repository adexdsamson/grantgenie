// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   // DialogTrigger,
// } from "@/components/ui/dialog";
// import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
// import { useRef, useState } from "react";
import { useState } from "react";
import { ReportDialog } from "./ReportDialog";
import Spinner from "@/components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@/hooks/useLazyQuery";
import { getRequest } from "@/lib/axiosInstance";
import { ConfirmAlert } from "@/components/layouts/ConfirmAlert";
import { ApiResponse, ApiResponseError, PitchFlowResponse } from "@/types";
// import { useQuery } from "@tanstack/react-query";

export interface ProposalCardProps {
  id: number;
  title: string;
  status: "continue" | "completed";
  onClick: () => void;
  description: string;
  grant_pitchflow_uuid?: string
}

export const ReportCard: React.FC<ProposalCardProps> = ({
  id,
  title,
  status,
  description,
  grant_pitchflow_uuid,
}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [fetchQuery, query] = useLazyQuery<
    unknown,
    ApiResponse<PitchFlowResponse[]>,
    ApiResponseError
  >(
    ["pitch-flow", id],
    async () => await getRequest(`grants/pitchflows/?project_id=${id}`)
  );

  const [fetch, mutation] = useLazyQuery<
    unknown,
    ApiResponse<PitchFlowResponse[]>,
    ApiResponseError
  >(
    ["pitch-flow-pdf", id],
    async () => await getRequest(`grants/pitchflows/${grant_pitchflow_uuid}/generate-pdf/`)
  );

  const handleProjectStatus = async () => {
    try {
      const res = await fetchQuery();

      if (!res.data) {
        return;
      }

      if (res.data.length === 0) {
        setShow(true);
        return;
      }

      if (!res.data?.[0].agreement_signed || !res.data?.[0].payment_confirmed) {
        setShow(true);
        return;
      }

      navigate(`/dashboard/projects/${res.data?.[0].id}/welcome`, {
        state: res.data?.[0],
      });
    } catch (error) {
      console.log("err: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-between px-4 py-4 bg-white rounded-md border border-solid border-slate-200 min-h-[187px] max-md:px-5">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="px-4 py-1 w-fit text-xs font-sans mb-1 leading-loose whitespace-nowrap rounded bg-slate-300 text-slate-900">
            Proposal
          </div>

          <ConfirmAlert
            title="Final confirmation"
            text="This action cannot be undone"
            url={`grants/projects/${id}/`}
            queryKey="project-lists"
            trigger={
              <Button size="icon" className="h-8 !px-2" variant="outline">
                <Trash className="w-4 h-4 text-red-600" />
              </Button>
            }
          />
        </div>

        <div className="flex flex-col max-w-full w-[250px]">
          <h3 className="text-sm font-medium leading-5 text-black font-sans">
            {title}
          </h3>
        </div>
        <p className="text-xs mt-0.5 text-gray-500">{description}</p>
      </div>

      <div>
        {/* <div className="flex flex-col mt-7 w-full rounded-[40px]">
          <p className="self-start text-xs leading-snug text-slate-700 font-sans">
            Progress
          </p>
          <div className="flex flex-col items-start bg-slate-300 bg-opacity-40 min-h-[7px] rounded-[40px]">
            <div
              className="flex max-w-full bg-zinc-300 min-h-[7px] rounded-[40px]"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div> */}

        <div className="flex gap-10 justify-between items-center mt-1 w-full">
          <Button
            size="icon"
            variant="outline"
            className="h-8 !px-2"
            onClick={fetch}
            isLoading={mutation.isLoading}
            disabled={status === "continue"}
            aria-label="Proposal action"
          >
            <Download className="w-4 h-4" />
          </Button>
          <ReportDialog
            {...{
              id: id,
              status,
              open: show,
              category: "grant",
              onOpenChange: setShow,
              isLoading: query.isLoading,
              onClick: handleProjectStatus,
              projectId: query.data?.data?.[0]?.id,
              payment_confirmed: query.data?.data?.[0]?.payment_confirmed ?? false,
              signature_confirmed: query.data?.data?.[0]?.agreement_signed ?? false,
            }}
          />
          {/* <ProposalTypeCard
            {...{
              id,
              status,
              open: show,
              onOpenChange: setShow,
              isLoading: query.isLoading,
              data: query.data?.data?.[0],
              onClick: handleProjectStatus,
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

// ======+++++++==========+++++++++++++=================+++==

// const projectTypes: ProjectTypeProps[] = [
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a2328b2c77bb6d89d84dfa0f5a26ed5bee01218709024724ca49867929f2a42?placeholderIfAbsent=true&apiKey=877fbded3c1141a18415be7a6b510b08",
//     title: "Immigration",
//     description: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     isSelected: false,
//     disabled: true,
//   },
// ];

// type ProposalTypeCardProps = {
//   status: ProposalCardProps["status"];
//   onOpenChange: (val: boolean) => void;
//   id: number;
//   open: boolean;
//   onClick: () => void;
//   isLoading: boolean;
//   data?: PitchFlowResponse;
// };

// const ProposalTypeCard = ({
//   id,
//   open,
//   data,
//   onClick,
//   isLoading,
//   onOpenChange,
//   status = "continue",
// }: ProposalTypeCardProps) => {
//   return (
//     <Dialog {...{ open, onOpenChange }}>
//       {/* <DialogTrigger asChild> */}
//       <Button
//         size="sm"
//         className="h-8 gap-1"
//         isLoading={isLoading}
//         onClick={onClick}
//         disabled={status === "completed"}
//       >
//         <span className="self-stretch my-auto">{status}</span>
//         {status === "completed" ? (
//           <Lock className="w-4 h-4" />
//         ) : (
//           <ChevronRight className="w-4 h-4" />
//         )}
//       </Button>
//       {/* </DialogTrigger> */}

//       <DialogContent className="max-w-none w-[28rem]">
//         <DialogHeader>
//           <DialogTitle>Project Types</DialogTitle>
//           <DialogDescription>
//             Select project type to required for the agency.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="mt-3">
//           <ReportDialog
//             {...{
//               id: id,
//               projectId: data?.id,
//               category: "grant",
//               payment_confirmed: data?.payment_confirmed ?? false,
//               signature_confirmed: data?.agreement_signed ?? false,
//             }}
//           />

//           {projectTypes.map((type, index) => (
//             <div
//               key={index}
//               className={`flex flex-col ${index > 0 ? "mt-2" : ""}`}
//             >
//               <ProjectTypeCard {...type} />
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

export interface ProjectTypeProps {
  icon: string;
  title: string;
  disabled?: boolean;
  description: string;
  isSelected?: boolean;
  isLoading?: boolean;
}

export const ProjectTypeCard: React.FC<ProjectTypeProps> = ({
  icon,
  title,
  description,
  isSelected = false,
  disabled,
  ...rest
}) => {
  return (
    <div
      {...rest}
      role="button"
      tabIndex={0}
      className={`flex flex-col justify-center py-3 w-full bg-white rounded-xl min-h-[69px] mb-1 relative ${
        isSelected ? "border shadow" : ""
      } ${
        disabled && "opacity-45"
      } hover:border border-indigo-300 border-solid hover:shadow`}
    >
      <div className="flex gap-3 pl-3 items-center">
        <div className="flex gap-0.5 justify-center items-center self-stretch px-2 my-auto w-10 h-10 bg-slate-300 min-h-[40px] rounded-[48px]">
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </div>
        <div className="flex flex-col self-stretch my-auto rounded-none w-[290px]">
          <h3 className="self-start text-sm font-semibold leading-none text-slate-800">
            {title}
          </h3>
          <p className="text-xs leading-4 text-slate-600">{description}</p>
        </div>
      </div>
      {rest.isLoading && (
        <div className="absolute right-4">
          <Spinner />
        </div>
      )}
    </div>
  );
};
