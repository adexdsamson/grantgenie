import { ApiResponse, ApiResponseError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ProjectList } from "../Projects";
import { getRequest } from "@/lib/axiosInstance";
import { ContentHeader } from "@/components/layouts/ContentHeader";
import { cn } from "@/lib/utils";
import { MapList } from "@/components/layouts/MapList";
import { EmptyPlaceholder } from "@/components/layouts/EmptyPlaceholder";
import { truncate } from "lodash";
import { CandidateCard } from "./components/EmployeeCard";
import { CreateEmployeeDialog } from "./components/CreateEmployee";


export const Employees = () => {
    const navigate = useNavigate();
  
    const { data, isPending } = useQuery<
      ApiResponse<ProjectList[]>,
      ApiResponseError
    >({
      queryKey: ["project-lists"],
      queryFn: () => getRequest("/grants/projects/"),
    });
  
    return (
      <>
        <header className="flex flex-wrap gap-10 justify-between items-start px-6 pt-11 pb-20 mt-9 w-full rounded-2xl bg-indigo-300 bg-opacity-40 min-h-[221px] max-md:px-5 max-md:max-w-full">
          <ContentHeader
            title="Employees"
            description="With the information you provide, our AI crafts presentations that include essential elements like problem statements, market opportunity, competitive analysis, and revenue models.."
          />
  
          <CreateEmployeeDialog />
        </header>
        <div
          className={cn("md:grid-cols-4 grid-cols-1 gap-5 mt-5", {
            grid: (data?.data.length ?? 0 > 1) || isPending,
          })}
        >
          <MapList
            data={data?.data ?? []}
            isLoading={isPending}
            renderItem={(project, index) => (
              <CandidateCard
                key={index}
                {...project}
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
  