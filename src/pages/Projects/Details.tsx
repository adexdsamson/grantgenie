import { useEffect, useState } from "react";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/assets/GrantGenie Logo.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ApiResponse,
  ApiResponseError,
  EmployeeListResponse,
  PitchFlowResponse,
  QuestionsLink,
} from "@/types";
import { getRequest, patchRequest, postRequest } from "@/lib/axiosInstance";
import { useToastHandlers } from "@/hooks/useToaster";
import { useLocation, useNavigate } from "react-router-dom";
import { ScreenLoader } from "@/components/layouts/ScreenLoader";
import { useLazyQuery } from "@/hooks/useLazyQuery";
import { SurveyData, WizardForm } from "./Layouts/Wizard";
import { useStep } from "usehooks-ts";
import { Progress } from "@/components/ui/progress";
import Spinner from "@/components/ui/Spinner";
import { cn, downloadFile } from "@/lib/utils";
import Markdown from "react-markdown";
import { useUser } from "@/store/authSlice";

// const navigationIcons = {
//   1: Boxes,
//   2: Building,
//   3: Database,
//   4: Edit,
// };

export const ProjectDetail = () => {
  const location = useLocation();
  const [showPage, setShowPage] = useState<"welcome-page" | "question-page">(
    "welcome-page"
  );

  const projectId =
    location.search.split("=")?.[1] ?? (location.state.project as number);

  const { data } = useQuery<
    ApiResponse<EmployeeListResponse[]>,
    ApiResponseError
  >({
    queryKey: ["employee-lists"],
    queryFn: async () => await getRequest("grants/employees/"),
  });

  const pitchQuery = useQuery<
    ApiResponse<PitchFlowResponse[]>,
    ApiResponseError
  >({
    queryKey: ["pitch-flows", projectId],
    queryFn: async () =>
      await getRequest(`grants/pitchflows/?project_id=${projectId}`),
  });

  return (
    <div className="min-h-[80vh]">
      <WelcomeBanner
        title="Let's Get Started"
        description="Learn more about the grant and how GrantGenie platform works"
      />

      <ScreenLoader isLoading={pitchQuery.isLoading} />

      {showPage === "welcome-page" ? (
        <WelcomePage
          projectId={pitchQuery.data?.data?.[0].agency_id ?? null}
          onNext={() => setShowPage("question-page")}
        />
      ) : (
        <QuestionPage
          employees={data?.data ?? []}
          expertsInvolved={pitchQuery.data?.data[0].employees_involved ?? []}
          questions={pitchQuery.data?.data[0].questions ?? null}
          agency={pitchQuery.data?.data?.[0]?.agency_id ?? ""}
          hasSubmittedEmployees={
            pitchQuery.data?.data[0].employees_involved !== null
          }
        />
      )}
    </div>
  );
};

//

export interface WelcomeDescriptionType {
  status: string;
  data: Data;
}

export interface Data {
  text: string;
  title: string;
  body: string;
}

const WelcomePage = (props: {
  onNext: () => void;
  projectId: string | null;
}) => {
  // const [activeTab, setActiveTab] = useState(0);

  const { data, isPending } = useQuery<
    ApiResponse<WelcomeDescriptionType>,
    ApiResponseError
  >({
    queryKey: ["welcome-page", props.projectId],
    queryFn: async () =>
      await getRequest(`grants/agencies/${props.projectId}/welcome/`),
    enabled: props.projectId !== null,
  });

  const handleTab = () => {
    props.onNext();
    // navigationItems.length === activeTab + 1
    //   ? props.onNext()
    //   : setActiveTab((prev) => prev + 1);
  };

  if (isPending) {
    return (
      <div className="h-[60vh] max-md:mt-10 max-md:mb-2.5 mt-14">
        <div className="bg-gray-200 h-10 w-full animate-pulse max-w-xl" />
        <div className="mt-5">
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5 max-w-5xl" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5 max-w-4xl" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5 max-w-5xl" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5 max-w-5xl" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5 max-w-4xl" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5" />
          <div className="bg-gray-300 h-3 w-full animate-pulse mt-5 max-w-5xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14 w-full max-w-[1098px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full mb-5">
      <div className="flex gap-5 max-md:flex-col">
        <ScrollArea>
          <div className="flex flex-col ml-5 h-fit max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-black max-md:mt-6 max-md:max-w-full">
              <div className="text-3xl font-semibold tracking-tight leading-9 max-w-4xl">
                {data?.data.data.title}
              </div>
              <div className="mt-4 text-base leading-7 max-md:max-w-full">
                <Markdown>{data?.data.data?.body}</Markdown>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="flex items-center justify-end mt-10 gap-3">
        {/* {activeTab !== 0 && (
          <Button variant={"ghost"} onClick={handleTab}>
            {"Prev"}
          </Button>
        )} */}
        <Button onClick={handleTab}>
          {/* {navigationItems.length === activeTab + 1 ? "Start" : "Next"} */}
          Start Application
        </Button>
      </div>
    </div>
  );
};

function convertToSurveyJS(
  jsonData: PitchFlowResponse["questions"]
): SurveyData[] {
  const surveyJSON: SurveyData[] = [];

  if (jsonData === null) {
    return [];
  }

  const questions = jsonData;

  Object.keys(questions).forEach((key) => {
    const questionData = questions[key];

    // Remove line breaks from sample_answer
    const sanitizedSampleAnswer = questionData.sample_answer
      .replace(/\n/g, " ")
      .trim();

    const page: SurveyData = {
      name: key,
      answer: sanitizedSampleAnswer,
      title: questionData.question.trim(),
      guidance: questionData.guidance.trim(),
      type: "input",
    };

    surveyJSON.push(page);
  });

  return surveyJSON;
}

type QuestionPageProps = {
  agency: string;
  expertsInvolved: number[];
  hasSubmittedEmployees: boolean;
  employees: EmployeeListResponse[];
  questions: PitchFlowResponse["questions"] | null;
};

const QuestionPage = (props: QuestionPageProps) => {
  const user = useUser()
  const location = useLocation();
  const navigate = useNavigate();
  const { error, success } = useToastHandlers();
  const [show, setShow] = useState(() => (props.questions ? true : false));
  const [eligibilityCheck, setEligibilityCheck] = useState(false);

  const projectUUID = extractUUID(location.pathname);
  const projectId =
    parseInt(location.search.split("=")?.[1]) ??
    (location.state.project as number);

  const questionMutation = useMutation<
    ApiResponse<Record<number, QuestionsLink>>,
    ApiResponseError
  >({
    mutationFn: async () =>
      await postRequest(
        `grants/pitchflows/${projectUUID}/generate-questions/`,
        {
          include_answers: true,
        },
        {
          timeout: 600000,
        }
      ),
    onSuccess() {
      setShow(!show);
      setEligibilityCheck(false);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: {
      topic: string;
      employees_involved: number[];
    }) => await patchRequest(`grants/pitchflows/${projectUUID}/`, payload),
    onSuccess() {
      setEligibilityCheck(true);
    },
    onError(err) {
      error("Pitch", err as ApiResponseError);
    },
  });

  const [fetchPdf] = useLazyQuery<
    unknown,
    ApiResponse<{ pdf_link: string }>,
    ApiResponseError
  >(
    ["generate-pdf", projectUUID],
    async () =>
      await getRequest(`grants/pitchflows/${projectUUID}/generate-document/`, {
        timeout: 600000,
      })
  );

  const answerMutation = useMutation({
    mutationFn: async (payload: any) =>
      await patchRequest(`grants/pitchflows/${projectUUID}/`, payload),
    onSuccess() {
      success("Answer Submission", "Answer submitted successfully");
    },
    onError(err) {
      error("Submitting Answer", err as ApiResponseError);
    },
  });

  const surveyJson: any[] = [
    {
      name: "topic",
      title: "Firstly, do you have a topic in mind?",
      answer: "",
      guidance: "",
      type: "input",
    },
    {
      name: "employees",
      title: "Select employees involved in the project?",
      type: "checkbox",
      choices: props.employees,
      answer: props.expertsInvolved ?? [],
      guidance: "",
    },
  ];

  const surveyQuestion = convertToSurveyJS(
    questionMutation.data?.data ?? props.questions
  );

  const handleComplete = (survey: any) => {
    if (!show) {
      const payload = {
        employees_involved: survey.employees,
        topic: survey.topic,
      };

      mutate(payload);
      return;
    }

    answerMutation.mutate({ answers: survey });
  };

  useEffect(() => {
    if (props.hasSubmittedEmployees && props.questions === null) {
      questionMutation.mutate();
    }
  }, [props.hasSubmittedEmployees, props.questions]);

  const handleDownload = async () => {
    try {
      const res = await fetchPdf();

      if (res.data.pdf_link) {
        await downloadFile(res.data.pdf_link);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (answerMutation.isSuccess) {
    return (
      <div className="w-[50vw] mx-auto h-[50vh] flex flex-col items-center justify-center">
        <h6 className="text-xl text-center mb-5">
          You have completed the survey questions, you will receive the approved documents in your mailbox (<strong>{user?.email}</strong>) after our experts have reviewed the documents within 2 to 3 business working days.
        </h6>
        <div className="flex items-center gap-3">
          <Button
            // variant={"ghost"}
            onClick={() => navigate("/dashboard/projects")}
          >
            Close project
          </Button>
          {/* <Button isLoading={query.isLoading} onClick={handleDownload}>
            Download document
          </Button> */}
        </div>
      </div>
    );
  }

  return questionMutation.isPending || isPending ? (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Spinner />
      {questionMutation.isPending && (
        <p className="max-w-96 text-center">
          Wait while we generate the appropriate questions, might take up to 10
          minutes.
        </p>
      )}
    </div>
  ) : eligibilityCheck ? (
    <EligibilityForm
      {...{
        projectId,
        agencyId: props.agency,
        onSkip: () => questionMutation.mutate(),
      }}
    />
  ) : (
    <Wizard
      {...{
        isLoading: answerMutation.isPending,
        survey: show ? surveyQuestion : surveyJson,
        skipPreview: show ? false : true,
        onSubmit: handleComplete,
      }}
    />
  );
};

// Function to extract UUID from a given URL
function extractUUID(url: string) {
  // Regular expression to match a UUID (version 4 format)
  const uuidRegex =
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

  // Find the match in the URL
  const match = url.match(uuidRegex);

  // Return the matched UUID or null if not found
  return match ? match[0] : null;
}

type WizardProps = {
  isLoading: boolean;
  survey: any[];
  skipPreview: boolean;
  onSubmit: (data: any) => void;
};

const Wizard = ({ survey, skipPreview, isLoading, onSubmit }: WizardProps) => {
  const [
    current,
    { canGoToNextStep, canGoToPrevStep, goToNextStep, goToPrevStep },
  ] = useStep(survey.length);

  const progress = (current / survey.length) * 100;

  return (
    <div className="mt-5 min-h-[70vh]">
      <Progress {...{ value: progress, className: "h-2" }} />
      <img src={Logo} className="h-14 w-14" />

      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center">
        <WizardForm
          survey={survey}
          onSubmit={onSubmit}
          {...{
            current,
            isLoading,
            skipPreview,
            goToNextStep,
            goToPrevStep,
            canGoToNextStep,
            canGoToPrevStep,
          }}
        />
      </div>
    </div>
  );
};

type EligibilityProps = {
  agencyId: string;
  projectId: number;
  onSkip: () => void;
};

export interface EligibilityResponseData {
  eligibility_percentage: number;
  text_assessment: string;
  error: null;
}

const EligibilityForm = (props: EligibilityProps) => {
  const [data, setData] = useState<EligibilityResponseData | null>(null);
  const { error } = useToastHandlers();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<
    ApiResponse<{ data: EligibilityResponseData }>,
    ApiResponseError
  >({
    mutationFn: async () =>
      await postRequest(`grants/check-eligibility/${props.agencyId}/`, {
        project_id: props.projectId,
      }),
    onSuccess(data) {
      setData(data.data.data);
    },
    onError(err) {
      error("Eligibility", err as ApiResponseError);
    },
  });

  return (
    <div
      className={cn("flex flex-col items-center justify-center mx-auto", {
        "w-[60vw] h-full mt-14": data?.eligibility_percentage,
        "w-[35rem] h-[60vh]": !data?.eligibility_percentage,
      })}
    >
      {!data && (
        <h6 className="text-2xl">
          Would you like to check the project Eligibility
        </h6>
      )}
      {data && <Markdown>{data.text_assessment}</Markdown>}
      <div className="w-full flex justify-end mt-3 gap-3">
        {data && (
          <Button
            onClick={() => navigate("/dashboard/projects")}
            variant={"destructive"}
          >
            Cancel
          </Button>
        )}
        <Button onClick={props.onSkip} variant={data ? "default" : "outline"}>
          {data ? "Continue" : "Skip"}
        </Button>
        {!data && (
          <Button isLoading={isPending} onClick={() => mutate()}>
            Check Eligibility
          </Button>
        )}
      </div>
    </div>
  );
};
