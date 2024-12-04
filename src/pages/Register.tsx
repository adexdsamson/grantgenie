import * as yup from "yup";
import { Forger, useForge } from "@/lib/forge";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextInput,
  TextInputProps,
  TextPassword,
} from "@/components/layouts/FormInputs/TextInput";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@/lib/axiosInstance";
import { useToastHandlers } from "@/hooks/useToaster";
import { ApiResponse, ApiResponseError, AuthResponse } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { useSetToken, useSetUser } from "@/store/authSlice";

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  companyEmail: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().trim().required(),
  phone: yup.string().required(),
  company: yup.string().required(),
  companyEmail: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required(),
});



export const Index = () => {
  const navigate = useNavigate()
  const setUser = useSetUser()
  const setToken = useSetToken()
  const { error, success } = useToastHandlers();

  const { ForgeForm } = useForge<FormState, TextInputProps>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation<ApiResponse<AuthResponse>, ApiResponseError, FormState>({
    mutationFn: async (payload: FormState) =>
      await postRequest("auth/register/", payload),
  });

  const handleSubmit = async (data: FormState) => {
    const Toast_Title = "";
    try {
      const result = await mutateAsync(data);

      if(!result.data){
        return
      }

      setUser(result.data.user);
      setToken(result.data.access_token)
      success(Toast_Title, "Account created");
      navigate("/dashboard")
      // navigate("/verification")
    } catch (err) {
      error(Toast_Title, err as ApiResponseError);
    }
  };

  return (
    <section className="mt-10 w-full">
      <h1 className="self-start text-3xl font-sans tracking-tight leading-tight font-semibold text-black">
        Create an account
      </h1>
      <p className="mt-3 text-base font-sans font-normal leading-7">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-300  font-bold">
          Log in
        </Link>
      </p>

      <div className="mt-16">
        <ForgeForm onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-10">
            <Forger
              {...{
                name: "first_name",
                label: "First Name",
                placeholder: "Name",
                component: TextInput,
                containerClass: "mb-5",
                helperText: "Enter your full name",
              }}
            />

            <Forger
              {...{
                name: "last_name",
                label: "Last Name",
                placeholder: "Name",
                component: TextInput,
                containerClass: "mb-5",
                helperText: "Enter your full name",
              }}
            />
          </div>

          <div className="flex items-center gap-4 mb-10">
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
            <Forger
              {...{
                name: "phone",
                label: "Phone",
                type: "tel",
                placeholder: "Phone",
                // containerClass: "mb-5",
                component: TextInput,
                helperText: "Enter your phone number",
              }}
            />
          </div>

          <div className="flex items-center gap-4 mb-10">
            <Forger
              {...{
                name: "company",
                label: "Company",
                placeholder: "Company Name",
                component: TextInput,
                // containerClass: "mb-5",
                helperText: "Enter your company name",
              }}
            />
            <Forger
              {...{
                name: "companyEmail",
                label: "Company Email",
                type: "email",
                placeholder: "Email",
                // containerClass: "mb-5",
                component: TextInput,
                helperText: "Enter your company email",
              }}
            />
          </div>

          <div className="flex items-center gap-4 mb-10">
            <Forger
              {...{
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "Password",
                component: TextPassword,
                containerClass: "",
                helperText: "Enter a secure 8 character password",
              }}
            />
            <Forger
              {...{
                name: "confirmPassword",
                label: "Confirm Password",
                type: "password",
                placeholder: "Password",
                component: TextPassword,
                helperText: "Enter a secure 8 character password",
              }}
            />
          </div>
          <div className="flex justify-end mt-5">
            <Button isLoading={isPending} type="submit" className="px-20">
              Register
            </Button>
          </div>
        </ForgeForm>
      </div>
    </section>
  );
};
