import { ContentHeader } from "@/components/layouts/ContentHeader";
import { EmptyPlaceholder } from "@/components/layouts/EmptyPlaceholder";
import { MapList } from "@/components/layouts/MapList";
import { postRequest } from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import {
  ApiResponse,
  ApiResponseError,
  OppHit,
  OpportunityResponseData,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Placeholder from "@/assets/image.png";
import { getLocalTimeZone, today } from "@internationalized/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { TextInputProps } from "@/components/layouts/FormInputs/TextInput";
import { useDebounceCallback } from "usehooks-ts";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import type { DateValue } from "react-aria-components";
import { Button as Btn } from "@/components/ui/button";
import OpportunityCard from "./ components/OpportunityCard";

type MutationBody = { keyword: string };

const getFilterByDate = (data: OppHit[], startDate?: string) => {
  const start = startDate ? new Date(startDate) : null; // Parse start date

  if (start === null) return data;

  const filtered = data.filter((item) => {
    const itemDate = new Date(item.openDate); // Parse the item's date
    return itemDate >= start; // Between start and end dates
  });

  return filtered;
};

export const Opportunity = () => {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState<DateValue | null>(null);

  const { mutate, data, isPending, isSuccess } = useMutation<
    ApiResponse<OpportunityResponseData>,
    ApiResponseError,
    MutationBody
  >({
    mutationKey: ["opportunity-lists"],
    mutationFn: async (body) =>
      await postRequest("grants/grant_opportunity_search/", body),
  });

  const debounceSearch = useDebounceCallback(
    (value: string) => mutate({ keyword: value }),
    500
  );

  // Get the items for the current page
  const itemsPerPage = 10;
  const startIndex = page * itemsPerPage;

  const currentOppHits = getFilterByDate(
    data?.data.oppHits ?? [],
    date?.toString()
  ).slice(startIndex, startIndex + itemsPerPage);

  // Calculate the total pages
  const totalPages = Math.ceil(
    date ? currentOppHits.length - 1 : data?.data.hitCount ?? 0 / itemsPerPage
  );

  useEffect(() => {
    if (isSuccess) return;
    mutate({ keyword: "" });
  }, [isSuccess]);

  console.log({ date, currentOppHits });
  

  return (
    <>
      <header className="flex flex-wrap gap-10 justify-between items-start px-6 pt-11 pb-20 mt-9 w-full rounded-2xl bg-indigo-300 bg-opacity-40 min-h-[221px] max-md:px-5 max-md:max-w-full">
        <ContentHeader
          title="Opportunity"
          description="With the information you provide, our AI crafts presentations that include essential elements like problem statements, market opportunity, competitive analysis, and revenue models.."
        />
      </header>

      <div className="flex items-center gap-4 mt-5">
        <SearchInput onChange={(event) => debounceSearch(event.target.value)} />
        <DateFilter value={date} onChange={setDate} />
        <Btn variant={"ghost"} onClick={() => {
          setDate(null);
        }} >Reset</Btn>
      </div>

      <div
        className={cn("md:grid-cols-3 grid-cols-1 gap-5 mt-5", {
          grid: (data?.data.oppHits.length ?? 0 >= 1) || isPending,
        })}
      >
        <MapList
          isLoading={isPending}
          data={currentOppHits ?? []}
          renderItem={(oppHits) => (
            <OpportunityCard key={oppHits.id} {...oppHits} />
          )}
          PlaceholderComponent={CoursePlaceholder}
          ListEmptyComponent={
            <EmptyPlaceholder {...{ title: "Opportunities" }} />
          }
        />
      </div>

      <div className="my-5">
        <Paginate
          currentPage={page}
          onChange={setPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};


const CoursePlaceholder = () => {
  return (
    <div className="flex justify-between px-4 py-4 gap-6 bg-gray-200 rounded-md border border-solid border-slate-200 min-h-[107px] max-md:px-5 animate-pulse">
      <div className="w-full">
        <div className="px-4 py-1 w-fit h-4 mb-2 rounded bg-gray-400"></div>
      </div>

      <div>
        <div className="flex flex-col mt-7 w-full rounded-[40px]">
          <div className="self-start h-4 mb-1 bg-gray-400 rounded w-1/2"></div>
          <div className="flex items-start h-1 bg-gray-400 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};

function DateFilter(props: any) {
  const now = today(getLocalTimeZone());
  return (
    <DatePicker {...props} className="space-y-2">
      <div className="flex">
        <Group className="inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
          <DateInput slot="start">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
              />
            )}
          </DateInput>
        </Group>
        <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70">
          <CalendarIcon size={16} strokeWidth={2} />
        </Button>
      </div>
      <Popover
        className="z-[1000] rounded-lg border border-border bg-white text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <Calendar onChange={(v) => console.log({ v })} className="w-fit">
            <header className="flex w-full items-center gap-1 pb-1">
              <Button
                slot="previous"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </Button>
              <Heading className="grow text-center text-sm font-medium" />
              <Button
                slot="next"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </Button>
            </header>
            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody className="[&_td]:px-0">
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={cn(
                      "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground outline-offset-2 transition-colors data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[hovered]:bg-accent data-[selected]:bg-primary data-[hovered]:text-foreground data-[selected]:text-primary-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70 data-[invalid]:data-[selected]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selected]:[&:not([data-hover])]:text-destructive-foreground",
                      date.compare(now) === 0 &&
                        "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selected]:after:bg-background"
                    )}
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}

function SearchInput(props: TextInputProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          {...props}
          id="search-input"
          className="peer pe-9 ps-9"
          placeholder="Search..."
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  paginationItemsToDisplay?: number;
};

export default function Paginate({
  onChange,
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Pagination */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* Previous page button */}
            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href={"#"}
                onClick={() =>
                  onChange(currentPage === 1 ? currentPage : currentPage - 1)
                }
                aria-label="Go to previous page"
                aria-disabled={currentPage === 1 ? true : undefined}
                role={currentPage === 1 ? "link" : undefined}
              >
                <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>

            {/* Left ellipsis (...) */}
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Page number links */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`#`}
                  onClick={() => onChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Right ellipsis (...) */}
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Next page button */}
            <PaginationItem>
              <PaginationLink
                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                href={"#"}
                onClick={() =>
                  onChange(
                    currentPage === totalPages ? currentPage : currentPage + 1
                  )
                }
                aria-label="Go to next page"
                aria-disabled={currentPage === totalPages ? true : undefined}
                role={currentPage === totalPages ? "link" : undefined}
              >
                <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Go to page input */}
      <div className="flex items-center gap-3">
        <Label htmlFor="pagination-input" className="whitespace-nowrap">
          Go to page
        </Label>
        <Input
          id="pagination-input"
          type="text"
          className="w-14"
          defaultValue={String(currentPage)}
        />
      </div>
    </div>
  );
}
