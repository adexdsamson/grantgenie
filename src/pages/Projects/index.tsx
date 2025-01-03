import { getRequest } from "@/lib/axiosInstance";
import { ApiResponse, ApiResponseError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateProjectDialog } from "./components/CreateProject";
import { MapList } from "@/components/layouts/MapList";
import { getPagePath } from "@/helpers";
import { dashboardPagePaths } from "@/routes";
import { EmptyPlaceholder } from "@/components/layouts/EmptyPlaceholder";
import { ContentHeader } from "@/components/layouts/ContentHeader";
import { cn } from "@/lib/utils";
import { ReportCard } from "./components/ProposalCard";
import { truncate } from "lodash";

export interface ProjectList {
  id: number;
  user: string;
  name: string;
  email: string;
  description: string;
  cv_link: string;
  created_at: string;
  submitted: boolean;
  submitted_at: null | string;
  updated_at: string;
  grant_pitchflow_uuid: string;
  is_deleted: boolean;
}

export const Projects = () => {
  const navigate = useNavigate();

  const { data, isPending } = useQuery<
    ApiResponse<ProjectList[]>,
    ApiResponseError
  >({
    queryKey: ["project-lists"],
    queryFn: async () => await getRequest("grants/projects/"),
  });

  return (
    <>
      <header className="flex flex-wrap gap-10 justify-between items-start px-6 pt-11 pb-20 mt-9 w-full rounded-2xl bg-indigo-300 bg-opacity-40 min-h-[221px] max-md:px-5 max-md:max-w-full">
        <ContentHeader
          title="Projects"
          description="Create projects to generate AI-powered presentations that seamlessly incorporate key components such as problem statements, market opportunities, competitive analyses, and revenue models."
        />

        <CreateProjectDialog />
      </header>
      <div
        className={cn("md:grid-cols-4 grid-cols-1 gap-5 mt-5", {
          grid: (data?.data.length ?? 0 >= 1) || isPending,
        })}
      >
        <MapList
          data={data?.data ?? []}
          isLoading={isPending}
          renderItem={(project, index) => (
            <ReportCard
              key={index}
              {...project}
              id={project.id}
              title={truncate(project.name, { length: 30 })}
              description={truncate(project.description, { length: 90 })}
              status={project?.submitted ? "completed" : "continue"}
              onClick={() =>
                navigate(
                  `${getPagePath(dashboardPagePaths, "Projects")}/${project.id}`
                )
              }
            />
          )}
          PlaceholderComponent={CoursePlaceholder}
          ListEmptyComponent={<EmptyPlaceholder {...{ title: "Project" }} />}
        />
      </div>
    </>
  );
};

const CoursePlaceholder = () => {
  return (
    <div className="flex flex-col justify-between px-4 py-4 bg-gray-200 rounded-md border border-solid border-slate-200 min-h-[187px] max-md:px-5 animate-pulse">
      <div className="w-full">
        <div className="px-4 py-1 w-fit h-4 mb-2 rounded bg-gray-400"></div>

        <div className="flex flex-col max-w-full w-[250px]">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
        </div>
      </div>

      <div>
        <div className="flex flex-col mt-7 w-full rounded-[40px]">
          <div className="self-start h-4 mb-1 bg-gray-400 rounded w-1/2"></div>
          <div className="flex items-start h-1 bg-gray-400 rounded-full w-full"></div>
        </div>

        <div className="flex gap-10 justify-between items-center mt-1 w-full">
          <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
