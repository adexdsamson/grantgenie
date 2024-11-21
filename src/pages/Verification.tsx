import {
    TextInput,
    TextInputProps,
  } from "@/components/layouts/FormInputs/TextInput";
  import { Button } from "@/components/ui/button";
  import { useToastHandlers } from "@/hooks/useToaster";
  import { postRequest } from "@/lib/axiosInstance";
  import { Forger, useForge } from "@/lib/forge";
  import { ApiResponseError } from "@/types";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useMutation } from "@tanstack/react-query";
  import * as yup from "yup";
  
  type FormState = {
    email: string;
  };
  
  const schema = yup.object({
    email: yup.string().email().required(),
  });
  
  export const Verification = () => {
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
  
        // if(result.data)
  
        success(Toast_Title, "");
      } catch (err) {
        error(Toast_Title, err as ApiResponseError);
      }
    };
    return (
      <section className="mt-10 w-full">
        <h1 className="self-start text-3xl font-sans tracking-tight leading-tight font-semibold text-black">
          Email Verification
        </h1>
        <p className="mt-3 text-base font-sans font-normal leading-7">
          Enter the OTP sent to your email address
        </p>
  
        <div className="mt-16">
          <ForgeForm onSubmit={handleSubmit}>
            <Forger
              {...{
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "Email",
                // containerClass: "mb-5",
                component: TextInput,
                helperText: "Enter your email address",
              }}
            />
          </ForgeForm>
  
          <div className="flex justify-end mt-5">
            <Button isLoading={isPending} className="px-20">
              Reset Password
            </Button>
          </div>
        </div>
      </section>
    );
  };
  