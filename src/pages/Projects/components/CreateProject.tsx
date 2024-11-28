import {
  Dialog,
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
import { Forger, useForge } from "@/lib/forge";
import { TextSelect } from "@/components/layouts/FormInputs/TextSelect";
import { TextArea } from "@/components/layouts/FormInputs/TextArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest } from "@/lib/axiosInstance";
import { ApiResponseError } from "@/types";
import { Button } from "@/components/ui/button";

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
  const { error, success } = useToastHandlers();

  const { ForgeForm } = useForge<FormState, TextInputProps>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormState) => postRequest("", payload),
  });

  const handleSubmit = async (data: FormState) => {
    const Toast_Title = "";
    try {
      const result = await mutateAsync(data);
      console.log(result);

      // if(result.data)

      queryClient.invalidateQueries({ queryKey: ["project-lists"] });

      success(Toast_Title, "");
    } catch (err) {
      error(Toast_Title, err as ApiResponseError);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new proposal</Button>
      </DialogTrigger>
      <DialogContent >
        <ForgeForm onSubmit={handleSubmit}>
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
              options: [],
              helperText: "",
            }}
          />

          <Forger
            {...{
              name: "description",
              label: "Description",
              placeholder: "",
              containerClass: "mb-3",
              component: TextArea,
              helperText: "",
            }}
          />

          <DialogFooter>
            <Button variant={"ghost"}>Cancel</Button>
            <Button type="submit" isLoading={isPending}>
              Create
            </Button>
          </DialogFooter>
        </ForgeForm>
      </DialogContent>
    </Dialog>
  );
};
