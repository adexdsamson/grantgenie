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

export interface GetAgreementResponse {
  id:             number;
  user:           number;
  project:        number;
  agreement:      number;
  agreement_link: string;
  signature_link: string;
  created_at:     Date;
  updated_at:     Date;
}

export interface GetLatestAgreementResponse {
  id:             number;
  agreement_link: string;
  category:       string;
  description:    string;
  created_at:     Date;
  updated_at:     Date;
}

export interface DashboardResponse {
  number_of_agencies_added:      number;
  number_of_employees:           number;
  number_of_projects:            number;
  project_completion_percentage: number;
  completed_projects:            number;
  project_creation_trend:        ProjectCreationTrend[];
  project_completion_trend:      any[];
  project_completion_pie_chart:  ProjectCompletionPieChart;
}

export interface ProjectCompletionPieChart {
  completed_projects:            number;
  incomplete_projects:           number;
  project_completion_percentage: number;
  active_projects:               number;
}

export interface ProjectCreationTrend {
  month: string;
  count: number;
}

export interface PitchFlowResponse {
  id:                  string;
  user:                number;
  project:             number;
  payment_confirmed:   boolean;
  agreement_signed: boolean;
  employees_involved:  null | number[];
  questions:      null | Record<number, QuestionsLink>;
  answers_link:        null;
  created_at:          Date;
  updated_at:          Date;
}

export interface QuestionsLink {
  question:      string;
  sample_answer: string;
  guidance:      string;
}
