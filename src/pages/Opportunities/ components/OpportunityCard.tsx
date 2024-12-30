import {
  ApiResponse,
  ApiResponseError,
  OppHit,
  SingleOpportunityResponse,
} from "@/types";
import Placeholder from "@/assets/image.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@/lib/axiosInstance";
import Spinner from "@/components/ui/Spinner";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Card = (props: OppHit & any) => {
  return (
    <div
      {...props}
      className="w-full rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring cursor-pointer"
    >
      <div className="flex grow items-start gap-1 h-full">
        <img
          loading="lazy"
          src={Placeholder}
          alt="Placeholder"
          className="object-contain max-w-full rounded-full aspect-square w-[30px]"
        />
        <div className="grid grow gap-3 w-ful h-full ">
          <div>
            <span className="text-xs font-normal text-blue-600 leading-[inherit] text-muted-foreground">
              {props.oppStatus}
            </span>
            <h6 className="text-sm">{props.title} </h6>
          </div>

          <div>
            <div className="flex items-center justify-between text-gray-500">
              <p className="text-xs">
                <span className="font-medium">Posted</span>: {props.openDate}
              </p>
              <p className="text-xs">
                <span className="font-medium">Close</span>:{" "}
                {props.closeDate.length ? props.closeDate : "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OpportunityCard(props: OppHit) {
  const [trigger, setTrigger] = useState(false);

  const { mutate, data, isPending, isSuccess } = useMutation<
    ApiResponse<SingleOpportunityResponse>,
    ApiResponseError
  >({
    mutationKey: ["opportunity-lists"],
    mutationFn: async () =>
      await postRequest("grants/grant_opportunity_details/", {
        oppId: props.id,
      }),
  });

  const opportunityData = data?.data;

  useEffect(() => {
    if (trigger) {
      mutate();
    }
  }, [trigger]);

  return (
    <Dialog onOpenChange={setTrigger}>
      <DialogTrigger asChild>
        <Card {...props} />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(80vh, 90vh)] sm:max-w-[60rem] [&>button:last-child]:hidden">
        {isPending ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Spinner />
          </div>
        ) : typeof opportunityData === "undefined" ? (
          <div className="flex items-center justify-center"></div>
        ) : (
          <>
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="px-6 py-6">
                {opportunityData?.opportunityTitle}
              </DialogTitle>
              <DialogDescription asChild>
                <Tabs defaultValue="tab-1">
                  <TabsList className="gap-1 bg-transparent px-4">
                    <TabsTrigger
                      value="tab-1"
                      className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                      {opportunityData.docType}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="tab-1" className="">
                    <div className="px-6">
                      <ScrollArea className="flex flex-col">
                        <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground h-[40vh]">
                          <div className="space-y-1 mb-3">
                            <p className="font-extrabold">
                              <strong>General Information</strong>
                            </p>
                            <p>{opportunityData.synopsis.synopsisDesc}</p>
                          </div>

                          <div className="space-y-1 mb-3">
                            <p className="font-extrabold">
                              <strong>General Information</strong>
                            </p>
                            <p>{opportunityData.synopsis.synopsisDesc}</p>
                          </div>
                          
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="border-t border-border px-6 py-4 sm:items-center">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button">I agree</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
