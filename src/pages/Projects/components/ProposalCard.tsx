import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Lock } from "lucide-react";

export interface ProposalCardProps {
  title: string;
  progress: number;
  status: "continue" | "completed";
  onClick: () => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  title,
  progress,
  status,
}) => {
  return (
    <article className="flex flex-col justify-between px-4 py-4 bg-white rounded-md border border-solid border-slate-200 min-h-[187px] max-md:px-5">
      <div className="w-full">
        <div className="px-4 py-1 w-fit text-xs font-sans mb-1 leading-loose whitespace-nowrap rounded bg-slate-300 text-slate-900">
          Proposal
        </div>

        <div className="flex flex-col max-w-full w-[250px]">
          <h3 className="text-sm font-medium leading-5 text-black font-sans">
            {title}
          </h3>
        </div>
      </div>

      <div>
        <div className="flex flex-col mt-7 w-full rounded-[40px]">
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
        </div>

        <div className="flex gap-10 justify-between items-center mt-1 w-full">
          <Button
            className="h-8 !px-2"
            size="icon"
            variant="outline"
            aria-label="Proposal action"
          >
            <Download className="w-4 h-4" />
          </Button>
          <ProposalTypeCard {...{ status }} />
        </div>
      </div>
    </article>
  );
};

// ======+++++++==========+++++++++++++=================+++==

const projectTypes: ProjectTypeProps[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a2328b2c77bb6d89d84dfa0f5a26ed5bee01218709024724ca49867929f2a42?placeholderIfAbsent=true&apiKey=877fbded3c1141a18415be7a6b510b08",
    title: "Grants and Contracts",
    description:
      "Enhances the grant application process for startups and businesses",
    isSelected: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a2328b2c77bb6d89d84dfa0f5a26ed5bee01218709024724ca49867929f2a42?placeholderIfAbsent=true&apiKey=877fbded3c1141a18415be7a6b510b08",
    title: "Immigration",
    description: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isSelected: false,
  },
];

const ProposalTypeCard = ({ status }: { status: ProposalCardProps["status"] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 gap-1"
          disabled={status === "completed"}
        >
          <span className="self-stretch my-auto">{status}</span>
          {status === "completed" ? (
            <Lock className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent asChild>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Select project type to required for the agency.
          </DialogDescription>
        </DialogHeader>

        <div>
          {projectTypes.map((type, index) => (
            <div
              key={index}
              className={`flex flex-col ${index > 0 ? "mt-2" : ""}`}
            >
              <ProjectTypeCard {...type} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export interface ProjectTypeProps {
  icon: string;
  title: string;
  description: string;
  isSelected?: boolean;
}

export const ProjectTypeCard: React.FC<ProjectTypeProps> = ({
  icon,
  title,
  description,
  isSelected = false,
}) => {
  return (
    <article
      role="button"
      tabIndex={0}
      className={`flex flex-col justify-center py-3 pl-2.5 w-full bg-white rounded-xl max-w-[356px] min-h-[69px] ${
        isSelected ? "border border-indigo-300 border-solid" : ""
      }`}
    >
      <div className="flex gap-3 justify-center items-center">
        <div className="flex gap-0.5 justify-center items-center self-stretch px-2 my-auto w-10 h-10 bg-slate-300 min-h-[40px] rounded-[48px]">
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </div>
        <div className="flex flex-col self-stretch my-auto rounded-none min-w-[240px] w-[296px]">
          <h3 className="self-start text-sm font-semibold leading-none text-slate-800">
            {title}
          </h3>
          <p className="text-xs leading-4 text-slate-600">{description}</p>
        </div>
      </div>
    </article>
  );
};
