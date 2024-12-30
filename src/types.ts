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
  project_completion_trend:      ProjectCompletionTrend[];
  project_completion_pie_chart:  ProjectCompletionPieChart;
}

export interface ProjectCompletionPieChart {
  completed_projects:            number;
  incomplete_projects:           number;
  project_completion_percentage: number;
  active_projects:               number;
}

export interface ProjectCompletionTrend {
  year: number;
  data: Trends[];
}

export interface Trends {
  month: string;
  count: number;
}


export interface ProjectCreationTrend {
  year: number;
  data: Trends[];
}

export interface PitchFlowResponse {
  id:                  string;
  user:                number;
  project:             number;
  payment_confirmed:   boolean;
  agreement_signed: boolean;
  employees_involved:  null | number[];
  questions:      null | Record<string, QuestionsLink>;
  answers_link:        null;
  created_at:          Date;
  updated_at:          Date;
}

export interface QuestionsLink {
  question:      string;
  sample_answer: string;
  guidance:      string;
}

export interface OpportunityResponseData {
  searchParams:       SearchParams;
  hitCount:           number;
  startRecord:        number;
  oppHits:            OppHit[];
  oppStatusOptions:   Agency[];
  dateRangeOptions:   Agency[];
  suggestion:         string;
  eligibilities:      Agency[];
  fundingCategories:  Agency[];
  fundingInstruments: Agency[];
  agencies:           Agency[];
  accessKey:          string;
  errorMsgs:          any[];
}

export interface Agency {
  subAgencyOptions?: Agency[];
  label:             string;
  value:             string;
  count:             number;
}

export interface OppHit {
  id:         string;
  number:     string;
  title:      string;
  agencyCode: string;
  agency:     string;
  openDate:   string;
  closeDate:  string;
  oppStatus:  OppStatus;
  docType:    DocType;
  cfdaList?:  string[];
}

export enum DocType {
  Forecast = "forecast",
  Synopsis = "synopsis",
}

export enum OppStatus {
  Forecasted = "forecasted",
  Posted = "posted",
}

export interface SearchParams {
  resultType:     string;
  searchOnly:     boolean;
  oppNum:         string;
  sortBy:         string;
  dateRange:      string;
  oppStatuses:    string;
  startRecordNum: number;
  rows:           number;
  keyword:        string;
  keywordEncoded: boolean;
}

export interface SingleOpportunityResponse {
  id:                        number;
  revision:                  number;
  opportunityNumber:         string;
  opportunityTitle:          string;
  owningAgencyCode:          string;
  listed:                    string;
  publisherUid:              string;
  flag2006:                  string;
  opportunityCategory:       OpportunityCategory;
  synopsis:                  Synopsis;
  agencyDetails:             AgencyDetails;
  topAgencyDetails:          AgencyDetails;
  synopsisAttachmentFolders: SynopsisAttachmentFolder[];
  synopsisDocumentURLs:      any[];
  synAttChangeComments:      any[];
  cfdas:                     Cfda[];
  opportunityHistoryDetails: any[];
  opportunityPkgs:           OpportunityPkg[];
  closedOpportunityPkgs:     any[];
  originalDueDate:           string;
  originalDueDateDesc:       string;
  synopsisModifiedFields:    any[];
  forecastModifiedFields:    any[];
  errorMessages:             any[];
  synPostDateInPast:         boolean;
  docType:                   string;
  forecastHistCount:         number;
  synopsisHistCount:         number;
  assistCompatible:          boolean;
  assistURL:                 string;
  relatedOpps:               any[];
  draftMode:                 string;
}

export interface AgencyDetails {
  code:          string;
  seed:          string;
  agencyName:    string;
  agencyCode:    string;
  topAgencyCode: string;
}

export interface Cfda {
  id:            number;
  opportunityId: number;
  cfdaNumber:    string;
  programTitle:  string;
}

export interface OpportunityCategory {
  category:    string;
  description: string;
}

export interface OpportunityPkg {
  id:                       number;
  topportunityId:           number;
  familyId:                 number;
  dialect:                  string;
  opportunityNumber:        string;
  opportunityTitle:         string;
  cfdaNumber:               string;
  openingDate:              string;
  closingDate:              string;
  owningAgencyCode:         string;
  agencyDetails:            AgencyDetails;
  topAgencyDetails:         AgencyDetails;
  programTitle:             string;
  contactInfo:              string;
  gracePeriod:              number;
  competitionId:            string;
  competitionTitle:         string;
  electronicRequired:       string;
  expectedApplicationCount: number;
  openToApplicantType:      number;
  listed:                   string;
  isMultiProject:           string;
  extension:                string;
  mimetype:                 string;
  lastUpdate:               string;
  workspaceCompatibleFlag:  string;
  packageId:                string;
  openingDateStr:           string;
  closingDateStr:           string;
}

export interface Synopsis {
  opportunityId:             number;
  version:                   number;
  agencyCode:                string;
  agencyName:                string;
  agencyPhone:               string;
  agencyDetails:             AgencyDetails;
  topAgencyDetails:          AgencyDetails;
  agencyContactPhone:        string;
  agencyContactName:         string;
  agencyContactDesc:         string;
  synopsisDesc:              string;
  responseDate:              string;
  responseDateDesc:          string;
  fundingDescLinkUrl:        string;
  fundingDescLinkDesc:       string;
  postingDate:               string;
  costSharing:               boolean;
  numberOfAwards:            string;
  estimatedFunding:          string;
  estimatedFundingFormatted: string;
  awardCeiling:              string;
  awardCeilingFormatted:     string;
  awardFloor:                string;
  awardFloorFormatted:       string;
  applicantEligibilityDesc:  string;
  createTimeStamp:           string;
  createdDate:               string;
  lastUpdatedDate:           string;
  applicantTypes:            ApplicantType[];
  fundingInstruments:        ApplicantType[];
  fundingActivityCategories: ApplicantType[];
  responseDateStr:           string;
  postingDateStr:            string;
  createTimeStampStr:        string;
}

export interface ApplicantType {
  id:          string;
  description: string;
}

export interface SynopsisAttachmentFolder {
  id:                  number;
  opportunityId:       number;
  folderType:          string;
  folderName:          string;
  zipLobSize:          number;
  createdDate:         string;
  lastUpdatedDate:     string;
  synopsisAttachments: SynopsisAttachment[];
}

export interface SynopsisAttachment {
  id:                  number;
  opportunityId:       number;
  mimeType:            string;
  fileName:            string;
  fileDescription:     string;
  fileLobSize:         number;
  createdDate:         string;
  synopsisAttFolderId: number;
}
