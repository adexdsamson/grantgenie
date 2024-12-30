import { useEffect, useState } from "react";
import { SidebarNav } from "./components/NavigationItem";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Boxes, Building, Database, Edit } from "lucide-react";
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
import { downloadFile } from "@/lib/utils";

export const navigationItems = [
  {
    text: "Welcome to your GrantGenie application",
    iconSrc: Boxes,
    title: "Welcome to your GrantGenie application",
    body: "Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim metus nec fringilla accumsan, risus sem sollicitudin lacus, utinterdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convalli diam sit amet lacinia. Aliquam in elementum tellus. \n Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentu ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo. \n nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. \n Vestibulum dictum ultrices elit a luctus. Sed in ante utleo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia sed elit id, sagittis rhoncus odio. Pellentesque sapien libero, lobortis a placerat et, malesuada sit amet dui. Nam sem sapien, congue eu rutrum nec, pellentesque eget ligula.  <br /> Nunc tempor interdum ex, sed cursus nunc egestas aliquet. Pellentesque interdum vulputate elementum. Donec erat diam, pharetra nec enim ut, bibendum pretium tellus. Vestibulum et turpis nibh. Cras vel ornare velit, ac pretium arcu. Cras justo augue, finibus id sollicitudin et, rutrum eget metus. Suspendisse ut mauris eu massa pulvinar sollicitudin vel sed enim. Pellentesque viverra arcu et dignissim vehicula. Donec a velit ac dolor dapibus pellentesque sit amet at erat. Phasellus porttitor, justo eu ultrices vulputate, nisi mi placerat lectus, sed rutrum tellus est id urna. Aliquam pellentesque odio metus, sit amet imperdiet nisl sodales eu. Quisque viverra nunc nec vestibulum dapibus. Integer nec diam a libero tincidunt varius sed vel odio. Donec rutrum dapibus massa, vel tempor nulla porta id. Suspendisse vulputate fermentum sem sollicitudin facilisis. Aliquam vehicula sapien nec ante auctor, quis mollis leo tincidunt.",
  },
  {
    text: "The United Nations Democracy Fund Program",
    iconSrc: Building,
    title: "The United Nations Democracy Fund Program",
    body: "Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim metus nec fringilla accumsan, risus sem sollicitudin lacus, utinterdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convalli diam sit amet lacinia. Aliquam in elementum tellus. \n  \n nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. \n Vestibulum dictum ultrices elit a luctus. Sed in ante utleo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia sed elit id, sagittis rhoncus odio. Pellentesque sapien libero, lobortis a placerat et, malesuada sit amet dui. Nam sem sapien, congue eu rutrum nec, pellentesque eget ligula.  <br /> Nunc tempor interdum ex, sed cursus nunc egestas aliquet. Pellentesque interdum vulputate elementum. Donec erat diam, pharetra nec enim ut, bibendum pretium tellus. Vestibulum et turpis nibh. Cras vel ornare velit, ac pretium arcu. Cras justo augue, quis mollis leo tincidunt.",
  },
  {
    text: "Application Planning",
    iconSrc: Database,
    title: "Application Planning",
    body: "Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim metus nec fringilla accumsan, risus sem sollicitudin lacus, utinterdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convalli diam sit amet lacinia. Aliquam in elementum tellus. \n Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentu ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo. \n nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. \n Vestibulum dictum ultrices elit a luctus. Sed in ante utleo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia sed elit id, sagittis rhoncus odio. Pellentesque sapien libero, lobortis a placerat et, malesuada sit amet dui. Nam sem sapien, congue eu rutrum nec, pellentesque eget ligula.  <br /> Nunc tempor interdum ex, sed cursus nunc egestas aliquet. Pellentesque interdum vulputate elementum. Donec erat diam, pharetra nec enim ut, bibendum pretium tellus. Vestibulum et turpis nibh. Cras vel ornare velit, ac pretium arcu. Cras justo augue, finibus id sollicitudin et, rutrum eget metus. Suspendisse ut mauris eu massa pulvinar sollicitudin vel sed enim. Pellentesque viverra arcu et dignissim vehicula. Donec a velit ac dolor dapibus pellentesque sit amet at erat. Phasellus porttitor, justo eu ultrices vulputate, nisi mi placerat lectus, sed rutrum tellus est id urna. Aliquam pellentesque odio metus, sit amet imperdiet nisl sodales eu. Quisque viverra nunc nec vestibulum dapibus. Integer nec diam a libero tincidunt varius sed vel odio. Donec rutrum dapibus massa, vel tempor nulla porta id. Suspendisse vulputate fermentum sem sollicitudin facilisis. Aliquam vehicula sapien nec ante auctor, quis mollis leo tincidunt.",
  },
  {
    text: "Research for My Application",
    iconSrc: Edit,
    title: "Research for My Application",
    body: "Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim metus nec fringilla accumsan, risus sem sollicitudin lacus, utinterdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convalli diam sit amet lacinia. Aliquam in elementum tellus. \n Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentu ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo. \n nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. \n Vestibulum dictum ultrices elit a luctus. Sed in ante utleo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales blandit sed et sem. Aenean quis finibus arcu, in hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia sed elit id, sagittis rhoncus odio. Pellentesque sapien libero, lobortis a placerat et, malesuada sit amet dui. Nam sem sapien, congue eu rutrum nec, pellentesque eget ligula.  <br /> Nunc tempor interdum ex, sed cursus nunc egestas aliquet. Pellentesque interdum vulputate elementum. Donec erat diam, pharetra nec enim ut, bibendum pretium tellus. Vestibulum et turpis nibh. Cras vel ornare velit, ac pretium arcu. Cras justo augue, finibus id sollicitudin et, rutrum eget metus. Suspendisse ut mauris eu massa pulvinar sollicitudin vel sed enim. Pellentesque viverra arcu et dignissim vehicula. Donec a velit ac dolor dapibus pellentesque sit amet at erat. Phasellus porttitor, justo eu ultrices vulputate, nisi mi placerat lectus, sed rutrum tellus est id urna. Aliquam pellentesque odio metus, sit amet imperdiet nisl sodales eu. Quisque viverra nunc nec vestibulum dapibus. Integer nec diam a libero tincidunt varius sed vel odio. Donec rutrum dapibus massa, vel tempor nulla porta id. Suspendisse vulputate fermentum sem sollicitudin facilisis. Aliquam vehicula sapien nec ante auctor, quis mollis leo tincidunt.",
  },
];

export const ProjectDetail = () => {
  const location = useLocation();
  const [showPage, setShowPage] = useState<"welcome-page" | "question-page">(
    "question-page"
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
        <WelcomePage onNext={() => setShowPage("question-page")} />
      ) : (
        <QuestionPage
          employees={data?.data ?? []}
          questions={pitchQuery.data?.data[0].questions ?? null}
          agency={pitchQuery.data?.data?.[0]?.agency_id ?? ""}
          hasSubmittedEmploees={
            pitchQuery.data?.data[0].employees_involved !== null
          }
        />
      )}
    </div>
  );
};

const WelcomePage = (props: { onNext: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTab = () => {
    navigationItems.length === activeTab + 1
      ? props.onNext()
      : setActiveTab((prev) => prev + 1);
  };

  return (
    <div className="mt-14 w-full max-w-[1098px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full mb-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
          {navigationItems.map((item, index) => (
            <>
              <SidebarNav
                key={index}
                index={index}
                text={item.text}
                iconSrc={item.iconSrc}
                isActive={index <= activeTab}
                lastItem={navigationItems.length - 1}
              />
            </>
          ))}
        </div>

        <ScrollArea>
          <div className="flex flex-col ml-5 h-[36rem] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-black max-md:mt-6 max-md:max-w-full">
              <div className="text-3xl font-semibold tracking-tight leading-9 w-">
                {navigationItems?.[activeTab]?.title}
              </div>
              <div className="mt-4 text-base leading-7 max-md:max-w-full">
                {navigationItems?.[activeTab]?.body}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="flex items-center justify-end mt-5 gap-3">
        {activeTab !== 0 && (
          <Button variant={"ghost"} onClick={handleTab}>
            {"Prev"}
          </Button>
        )}
        <Button onClick={handleTab}>
          {navigationItems.length === activeTab + 1 ? "Start" : "Next"}
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
  hasSubmittedEmploees: boolean;
  employees: EmployeeListResponse[];
  questions: PitchFlowResponse["questions"] | null;
};

const QuestionPage = (props: QuestionPageProps) => {
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
      setEligibilityCheck(false)
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

  const [fetchPdf, query] = useLazyQuery<unknown, ApiResponse<{ pdf_link: string }>, ApiResponseError>(
    ["generate-pdf", projectUUID],
    async () =>
      await getRequest(`grants/pitchflows/${projectUUID}/generate-pdf/`),
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
      answer: "",
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
    if (props.hasSubmittedEmploees && props.questions === null) {
      console.log("got here", props.questions, props.hasSubmittedEmploees);
      questionMutation.mutate();
    }
  }, [props.hasSubmittedEmploees, props.questions]);

  const handleDownload = async () => {
    try {
      const res = await fetchPdf();

      if(res.data.pdf_link) {
        await downloadFile(res.data.pdf_link);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (answerMutation.isSuccess) {
    return (
      <div className="w-[40vw] mx-auto h-[50vh] flex flex-col items-center justify-center">
        <h6 className="text-2xl text-center mb-10 font-semibold">
          You have completed the survey questions, download the output document
          before closing the project
        </h6>
        <div className="flex items-center gap-3">
          <Button
            variant={"ghost"}
            onClick={() => navigate("/dashboard/projects")}
          >
            Close project
          </Button>
          <Button isLoading={query.isLoading} onClick={handleDownload}>
            Download document
          </Button>
        </div>
      </div>
    );
  }

  return questionMutation.isPending || isPending ? (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Spinner />
      <p>Wait while we generate the appropriate questions</p>
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
  survey: any[];
  skipPreview: boolean;
  onSubmit: (data: any) => void;
};

const Wizard = ({ survey, skipPreview, onSubmit }: WizardProps) => {
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

  const { mutate, isPending } = useMutation<
    ApiResponse<EligibilityResponseData>,
    ApiResponseError
  >({
    mutationFn: async () =>
      await postRequest(`grants/check-eligibility/${props.agencyId}/`, {
        project_id: props.projectId,
      }),
    onSuccess(data) {
      setData(data.data);
    },
    onError(err) {
      error("Eligibility", err as ApiResponseError);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] w-[35rem] mx-auto">
      {!data && (
        <h6 className="text-2xl">
          Would you like to check the project Eligibility
        </h6>
      )}
      {data && <h5>Eligibility Score: {data.eligibility_percentage}% </h5>}
      {data && (
        <div dangerouslySetInnerHTML={{ __html: data.text_assessment }} />
      )}
      <div className="w-full flex justify-end mt-3 gap-3">
        <Button onClick={props.onSkip} variant={"outline"}>
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
