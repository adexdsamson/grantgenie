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
      TextFileUploader,
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
  
  export const CreateEmployeeDialog = () => {
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
          <Button>Add Employee</Button>
        </DialogTrigger>
        <DialogContent >
          <ForgeForm onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add employee details</DialogTitle>
              <DialogDescription>
                Provide the necessary detail of your employee
              </DialogDescription>
            </DialogHeader>
  
            <Forger
              {...{
                name: "name",
                label: "Full Name",
                type: "text",
                placeholder: "Employee",
                containerClass: "mb-3",
                component: TextInput,
                helperText: "Enter your employee full name",
              }}
            />
  
            <Forger
              {...{
                name: "email",
                label: "Email Address",
                placeholder: "",
                containerClass: "mb-3",
                component: TextInput,
                type: "email",
                helperText: "Enter your employee’s email address",
              }}
            />
  
            <Forger
              {...{
                name: "description",
                label: "Description",
                placeholder: "",
                containerClass: "mb-3",
                component: TextFileUploader,
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
  