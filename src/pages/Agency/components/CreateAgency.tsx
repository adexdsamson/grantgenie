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
import { Forger, useForge, FormPropsRef } from "@/lib/forge";
import { TextArea } from "@/components/layouts/FormInputs/TextArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest } from "@/lib/axiosInstance";
import { ApiResponseError } from "@/types";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

type FormState = {
  full_agency_name: string;
  website_link: string;
  requirements: string;
  description: string;
};

const schema = yup.object({
  full_agency_name: yup.string().required(),
  website_link: yup.string().required(),
  requirements: yup.string().required(),
  description: yup.string().required(),
});

export const CreateAgency = () => {
  const ref = useRef<FormPropsRef | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const { error, success } = useToastHandlers();

  const { ForgeForm } = useForge<FormState, TextInputProps>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormState) =>
      await postRequest("grants/agencies/", payload),
  });

  const handleSubmit = async (data: FormState) => {
    const Toast_Title = "Agency Creation";
    try {
      const result = await mutateAsync(data);

      if(!result.data){
        return 
      }

      queryClient.invalidateQueries({ queryKey: ["agency-lists"] });

      success(Toast_Title, "Created Successfully");

    } catch (err) {
      error(Toast_Title, err as ApiResponseError);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Agency</Button>
      </DialogTrigger>

      <DialogContent>
        <ForgeForm ref={ref} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Agency</DialogTitle>
            <DialogDescription>
              Provide information of the agency not available.
            </DialogDescription>
          </DialogHeader>

          <Forger
            {...{
              name: "full_agency_name",
              type: "text",
              label: "Name",
              component: TextInput,
              placeholder: "",
              containerClass: "mb-5 mt-5",
              helperText: "Enter your agency's Name",
            }}
          />

          <Forger
            {...{
              type: "url",
              placeholder: "",
              name: "website_link",
              component: TextInput,
              containerClass: "mb-5",
              label: "Website Link",
              helperText: "Enter the agency's website url",
            }}
          />

          <Forger
            {...{
              type: "text",
              placeholder: "",
              name: "requirements",
              component: TextArea,
              containerClass: "mb-5",
              label: "Requirements",
              helperText: "Enter the agency's website url",
            }}
          />

          <Forger
            {...{
              helperText: "",
              placeholder: "",
              component: TextArea,
              name: "description",
              label: "Description",
              containerClass: "mb-8",
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
              Add
            </Button>
          </DialogFooter>
        </ForgeForm>
      </DialogContent>
    </Dialog>
  );
};
