import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { base64ToFile } from "@/helpers";
import { useToastHandlers } from "@/hooks/useToaster";
import {
  fileUploadRequest,
  getRequest,
  postRequest,
} from "@/lib/axiosInstance";
import { Forger, useForge } from "@/lib/forge";
import { createFormData } from "@/lib/utils";
import {
  ApiResponse,
  ApiResponseError,
  GetLatestAgreementResponse,
  PitchFlowResponse,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectTypeCard } from "./ProposalCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TextSignature } from "@/components/layouts/FormInputs/TextInput";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@/hooks/useLazyQuery";

type AgreementSignature = {
  id: number;
  title: string;
  description: string;
  category: "grant" | "visa";
  open: boolean;
  onTrigger: () => void;
  onOpen: (value: boolean) => void;
  isLoading?: boolean;
};

export const SignatureDialog = ({
  id,
  open,
  title,
  onOpen,
  category,
  onTrigger,
  description,
  isLoading,
}: AgreementSignature) => {
  const { error } = useToastHandlers();

  const { data } = useQuery<
    ApiResponse<GetLatestAgreementResponse>,
    ApiResponseError
  >({
    queryKey: ["agreements", category],
    queryFn: async () =>
      await getRequest(`agreements/latest/?category=${category}`),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["agreement", id],
    mutationFn: async (payload: FormData) =>
      await fileUploadRequest(`grants/projects/${id}/agreements/`, payload),
  });

  const [fetchQuery] = useLazyQuery<
    unknown,
    ApiResponse<PitchFlowResponse[]>,
    ApiResponseError
  >(
    ["pitchflow", id],
    async () => await getRequest(`grants/pitchflows/?project_id=${id}`)
  );

  const checkoutMutation = useMutation<
    ApiResponse<{ status: boolean; message: string; data: { url: string } }>,
    ApiResponseError,
    { projectId: string }
  >({
    mutationFn: async (data: { projectId: string }) =>
      await postRequest("grants/pitchflows/payment-checkout/", {
        success_url: `${import.meta.env.VITE_APP_BASE_URL}/dashboard/projects/${data.projectId}/welcome?projectId=${id}`,
      }),
    onSuccess(data) {
      window.open(data.data.data.url, "_self");
    },
  });

  const { ForgeForm } = useForge({});

  const handleSubmit = async (payload: any) => {
    const Toast_Title = "Agreement";
    try {
      const file = base64ToFile(payload.signature, "signature.jpg");

      const formdata = createFormData({
        signature_image: file,
        flow_type: title.toLowerCase(),
        agreement_id: data?.data.id ?? "",
        agreement_link: data?.data.agreement_link ?? "",
      });

      const result = await mutateAsync(formdata);

      if (!result.data) {
        return;
      }

      const res = await fetchQuery();

      if (res.data.length === 0) {
        return;
      }

      checkoutMutation.mutate({
        projectId: res.data?.[0].id
      });

      // closeRef.current?.click()
      // queryClient.invalidateQueries({ queryKey: ["project-lists"] });
      // success(Toast_Title, "Project created successfully");
    } catch (err) {
      error(Toast_Title, err as ApiResponseError);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpen}>
      {/* <SheetTrigger disabled> */}
      <ProjectTypeCard
        {...{
          icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a2328b2c77bb6d89d84dfa0f5a26ed5bee01218709024724ca49867929f2a42?placeholderIfAbsent=true&apiKey=877fbded3c1141a18415be7a6b510b08",
          title,
          isLoading,
          description,
          onClick: onTrigger,
        }}
      />
      {/* </SheetTrigger> */}

      <SheetContent className="w-[30rem] sm:max-w-none">
        <SheetHeader>
          <SheetTitle>Agreement</SheetTitle>
        </SheetHeader>

        <ScrollArea>
          <div className="h-[50rem]">
            <div className="h-[38rem] w-full mt-2 bg-[#CFD0DF]">
              <iframe
                src={data?.data?.agreement_link}
                className="h-full w-full bg-white"
              />
            </div>

            <ForgeForm
              className="flex flex-col my-3 items-center"
              onSubmit={handleSubmit}
            >
              <Forger
                name="signature"
                label="Sign here"
                containerClass="border-4 border-dashed rounded-lg p-3"
                component={TextSignature}
                canvasProps={{
                  width: 400,
                  height: 100,
                  className: "bg-white dark:bg-slate-800 dark:text-slate-300",
                }}
              />

              <Button
                type="submit"
                isLoading={isPending}
                className="w-full my-8"
              >
                Continue
              </Button>
            </ForgeForm>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
