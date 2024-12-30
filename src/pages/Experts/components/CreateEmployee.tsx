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
  TextFileUploader,
  TextInput,
  TextInputProps,
} from "@/components/layouts/FormInputs/TextInput";
import { Forger, FormPropsRef, useForge } from "@/lib/forge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileUploadRequest } from "@/lib/axiosInstance";
import { ApiResponseError } from "@/types";
import { Button } from "@/components/ui/button";
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
  createFormData,
} from "@/lib/utils";
import { useRef } from "react";

type FormState = {
  name: string;
  email: string;
  cv_file: File[];
};

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cv_file: yup
    .array()
    .nullable()
    .required("VALIDATION_FIELD_REQUIRED")
    .test(
      "is-big-file",
      "The file size exceeds the maximum allowed size of 2MB.",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "VALIDATION_FIELD_FILE_WRONG_TYPE",
      checkIfFilesAreCorrectType
    )
    .required(),
});

export const CreateEmployeeDialog = () => {
  const queryClient = useQueryClient();
  const ref = useRef<FormPropsRef | null>(null);
  const { error, success } = useToastHandlers();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const { ForgeForm, reset } = useForge<FormState, TextInputProps>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FormData) =>
      await fileUploadRequest("grants/employees/", payload),
  });

  const handleSubmit = async (data: FormState) => {
    const Toast_Title = "Employee";
    try {
      const formData = createFormData({ ...data, cv_file: data.cv_file[0] });

      const result = await mutateAsync(formData);

      if (!result.data) {
        return;
      }

      reset();
      queryClient.invalidateQueries({ queryKey: ["employee-lists"] });
      closeRef.current?.click?.();
      success(Toast_Title, "Employee's record created successfully");
    } catch (err) {
      error(Toast_Title, err as ApiResponseError);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>
      <DialogContent>
        <ForgeForm ref={ref} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add employee details</DialogTitle>
            <DialogDescription>
              Provide the necessary detail of your employee
            </DialogDescription>
          </DialogHeader>

          <Forger
            {...{
              name: "name",
              type: "text",
              label: "Full Name",
              component: TextInput,
              placeholder: "Employee",
              containerClass: "mb-5 mt-5",
              helperText: "Enter your employee full name",
            }}
          />

          <Forger
            {...{
              name: "email",
              type: "email",
              placeholder: "",
              component: TextInput,
              label: "Email Address",
              containerClass: "mb-5",
              helperText: "Enter your employee’s email address",
            }}
          />

          <Forger
            {...{
              name: "cv_file",
              placeholder: "",
              containerClass: "mb-8",
              component: TextFileUploader,
              config: {
                accept: ".doc,.docx,.pdf"
              },
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
              Add
            </Button>
          </DialogFooter>
        </ForgeForm>
      </DialogContent>
    </Dialog>
  );
};
