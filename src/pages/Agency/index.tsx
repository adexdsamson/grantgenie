import { EmptyPlaceholder } from "@/components/layouts/EmptyPlaceholder";
import { ContentHeader } from "@/components/layouts/ContentHeader";
import { CreateAgency } from "./components/CreateAgency";
import { ApiResponse, ApiResponseError } from "@/types";
import { MapList } from "@/components/layouts/MapList";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/axiosInstance";
import { ProfileCard } from "./components/Agency";
import { AgencyResponse } from "./types";
import { cn } from "@/lib/utils";
import Placeholder from '@/assets/image.png';

export const Agencies = () => {
  const { data, isPending } = useQuery<
    ApiResponse<AgencyResponse[]>,
    ApiResponseError
  >({
    queryKey: ["agency-lists"],
    queryFn: async () => await getRequest("grants/agencies/"),
  });

  return (
    <>
      <header className="flex flex-wrap gap-10 justify-between items-start px-6 pt-11 pb-20 mt-9 w-full rounded-2xl bg-indigo-300 bg-opacity-40 min-h-[221px] max-md:px-5 max-md:max-w-full">
        <ContentHeader
          title="Agencies"
          description="With the information you provide, our AI crafts presentations that include essential elements like problem statements, market opportunity, competitive analysis, and revenue models.."
        />

        <CreateAgency />
      </header>
      <div
        className={cn("md:grid-cols-4 grid-cols-1 gap-5 mt-5", {
          grid: (data?.data.length ?? 0 > 1) || isPending,
        })}
      >
        <MapList
          data={data?.data ?? []}
          isLoading={isPending}
          renderItem={(agency, index) => (
            <ProfileCard
              imageUrl={Placeholder}
              name={agency.full_agency_name}
              key={index}
            />
          )}
          PlaceholderComponent={CoursePlaceholder}
          ListEmptyComponent={<EmptyPlaceholder {...{ title: "Agency" }} />}
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
