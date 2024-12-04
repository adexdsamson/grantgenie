import { AxiosResponse, AxiosError } from "axios";

export type User = {
  first_name: string;
  email: string;
  last_name: string;
};

export type ApiError = {
  status: boolean;
  message: string;
};

export type ApiResponse<T = unknown> = AxiosResponse<T>;
export type ApiResponseError = AxiosError<ApiError>;
export interface AuthResponse {
  user: User;
  access_token: string;
}


export interface EmployeeListResponse {
  id:         number;
  user:       string;
  name:       string;
  email:      string;
  cv_link:    string;
  created_at: Date;
  updated_at: Date;
}
