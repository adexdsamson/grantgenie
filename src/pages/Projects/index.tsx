import { getRequest } from "@/lib/axiosInstance";
import { ApiResponse, ApiResponseError, EmployeeListResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateProjectDialog } from "./components/CreateProject";
import { MapList } from "@/components/layouts/MapList";
import { getPagePath } from "@/helpers";
import { dashboardPagePaths } from "@/routes";
import { EmptyPlaceholder } from "@/components/layouts/EmptyPlaceholder";
import { ContentHeader } from "@/components/layouts/ContentHeader";
import { cn } from "@/lib/utils";
import { ProposalCard } from "./components/ProposalCard";
import { truncate } from "lodash";
import { AgencyResponse } from "../Agency/types";

export interface ProjectList {
  id: number;
  user: string;
  name: string;
  email: string;
  cv_link: string;
  created_at: string;
  updated_at: string;
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

  const employeeQuery = useQuery<
    ApiResponse<EmployeeListResponse[]>,
    ApiResponseError
  >({
    queryKey: ["employee-lists"],
    queryFn: async () => await getRequest("grants/employees/"),
  });



  return (
    <>
      <header className="flex flex-wrap gap-10 justify-between items-start px-6 pt-11 pb-20 mt-9 w-full rounded-2xl bg-indigo-300 bg-opacity-40 min-h-[221px] max-md:px-5 max-md:max-w-full">
        <ContentHeader
          title="Projects"
          description="With the information you provide, our AI crafts presentations that include essential elements like problem statements, market opportunity, competitive analysis, and revenue models."
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
            <ProposalCard
              key={index}
              {...project}
              title={truncate(project.name, { length: 30 })}
              progress={0}
              status="continue"
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
    <div className="w-full h-44 bg-gray-200 animate-pulse rounded-lg"></div>
  );
};
