import { ApiResponse, ApiResponseError, EmployeeListResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/axiosInstance";
import { ContentHeader } from "@/components/layouts/ContentHeader";
import { cn } from "@/lib/utils";
import { MapList } from "@/components/layouts/MapList";
import { EmptyPlaceholder } from "@/components/layouts/EmptyPlaceholder";
import { EmployeeCard } from "./components/EmployeeCard";
import { CreateEmployeeDialog } from "./components/CreateEmployee";


export const Employees = () => {
  const { data, isPending } = useQuery<
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
          isLoading={isPending}
          data={data?.data ?? []}
          renderItem={(employee, index) => (
            <EmployeeCard
              imageUrl=""
              {...employee}
              key={index}
              description={""}
              name={employee.name}
              email={employee.email}
              avatarText={employee.name}
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
