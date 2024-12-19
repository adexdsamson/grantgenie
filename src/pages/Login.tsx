import * as yup from "yup";
import { Forger, useForge } from "@/lib/forge";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextInput,
  TextInputProps,
  TextPassword,
} from "@/components/layouts/FormInputs/TextInput";
import { useToastHandlers } from "@/hooks/useToaster";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@/lib/axiosInstance";
import { ApiResponse, ApiResponseError, AuthResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { useSetToken, useSetUser } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

type FormState = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const Login = () => {
  const setUser = useSetUser()
  const setToken = useSetToken()
  const navigate = useNavigate()
  const { error, success } = useToastHandlers();

  const { ForgeForm } = useForge<FormState, TextInputProps>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation<ApiResponse<AuthResponse>, ApiResponseError, FormState>({
    mutationFn: async (payload: FormState) => postRequest("auth/login/", payload),
  });

  const handleSubmit = async (data: FormState) => {
    const Toast_Title = "Account Authentication";
    try {
      const result = await mutateAsync(data);
      
      if(!result.data){
        return
      }

      setUser(result.data.user);
      setToken(result.data.access_token)
      success(Toast_Title, "Account created");

      navigate("/dashboard/home")
    } catch (err) {
      error(Toast_Title, err as ApiResponseError);
    }
  };

  return (
    <section className="flex flex-col justify-center mt-28">
      <h1 className="self-start text-3xl font-sans tracking-tight leading-tight font-semibold text-black">
        Welcome Back
      </h1>
      <p className="mt-3 text-base font-sans font-normal leading-7">
        Don't have an account?{" "}
        <a href="/" className="text-indigo-300  font-bold">
          Create account
        </a>
      </p>

      <div className="mt-16">
        <ForgeForm onSubmit={handleSubmit}>
          <Forger
            {...{
              name: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Email",
              containerClass: "mb-5",
              component: TextInput,
              helperText: "Enter your email address",
            }}
          />

          <Forger
            {...{
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Password",
              component: TextPassword,
              containerClass: "mt-5",
              helperText: "Enter a secure 8 character password",
            }}
          />
        <div className="flex justify-end mt-5">
          <Button isLoading={isPending} type="submit" className="px-20">
            Login
          </Button>
        </div>
        </ForgeForm>

      </div>
    </section>
  );
};
