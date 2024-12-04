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
import { useToastHandlers } from "@/hooks/useToaster";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextInput,
  TextInputProps,
} from "@/components/layouts/FormInputs/TextInput";
import { Forger, FormPropsRef, useForge } from "@/lib/forge";
import { TextSelect } from "@/components/layouts/FormInputs/TextSelect";
import { TextArea } from "@/components/layouts/FormInputs/TextArea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest } from "@/lib/axiosInstance";
import { ApiResponse, ApiResponseError } from "@/types";
import { Button } from "@/components/ui/button";
import { AgencyResponse } from "@/pages/Agency/types";
import { useRef } from "react";

type FormState = {
  name: string;
  agency: string;
  description: string;
};

const schema = yup.object({
  name: yup.string().required(),
  agency: yup.string().required(),
  description: yup.string().required(),
});

export const CreateProjectDialog = () => {
  const queryClient = useQueryClient();
  const ref = useRef<FormPropsRef | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { error, success } = useToastHandlers();

  const { ForgeForm } = useForge<FormState, TextInputProps>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormState) => postRequest("grants/projects/", payload),
  });

  const agencyQuery = useQuery<ApiResponse<AgencyResponse[]>, ApiResponseError>(
    {
      queryKey: ["agency-lists"],
      queryFn: async () => await getRequest("grants/agencies/"),
    }
  );

  const handleSubmit = async (data: FormState) => {
    const Toast_Title = "Project";
    try {
      const result = await mutateAsync(data);

      if (!result.data) {
        return;
      }

      closeRef.current?.click()
      queryClient.invalidateQueries({ queryKey: ["project-lists"] });
      success(Toast_Title, "Project created successfully");
    } catch (err) {
      error(Toast_Title, err as ApiResponseError);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create project</Button>
      </DialogTrigger>
      <DialogContent>
        <ForgeForm ref={ref} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Select project type to required for the agency.
            </DialogDescription>
          </DialogHeader>

          <Forger
            {...{
              name: "name",
              label: "Name",
              type: "text",
              placeholder: "",
              containerClass: "mb-3 mt-3",
              component: TextInput,
              helperText: "",
            }}
          />

          <Forger
            {...{
              name: "agency",
              label: "Agency",
              placeholder: "",
              containerClass: "mb-3",
              component: TextSelect,
              options: agencyQuery.data?.data?.map?.((item) => ({
                label: item.full_agency_name,
                value: item.uuid,
              })),
              helperText: "",
            }}
          />

          <Forger
            {...{
              name: "description",
              label: "Description",
              placeholder: "",
              containerClass: "my-3",
              component: TextArea,
              helperText: "",
            }}
          />

          <DialogFooter>
            <DialogClose ref={closeRef} asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => ref.current?.onSubmit()}
              isLoading={isPending}
            >
              Create
            </Button>
          </DialogFooter>
        </ForgeForm>
      </DialogContent>
    </Dialog>
  );
};
