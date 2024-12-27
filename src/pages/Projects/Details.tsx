import { useEffect, useRef, useState } from "react";
import { SidebarNav } from "./components/NavigationItem";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Boxes, Building, Database, Edit } from "lucide-react";
import Logo from "@/assets/GrantGenie Logo.svg";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { CustomSurveyPanelless } from "./constants";
import { cn } from "@/lib/utils";
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
    "welcome-page"
  );

  const projectId =
    location.search.split("=")?.[1] ?? (location.state.project as number);
  const projectUUID = extractUUID(location.pathname);

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
    queryKey: ["pitch-flows"],
    queryFn: async () =>
      await getRequest(`grants/pitchflows/?project_id=${projectId}`),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await postRequest(`grants/confirm_payment/${projectUUID}/`, undefined),
  });

  useEffect(() => {
    if (
      pitchQuery.data?.data.length &&
      !pitchQuery.data?.data[0].payment_confirmed
    ) {
      mutate();
    }
  }, [pitchQuery.isSuccess]);

  return (
    <div className="">
      <WelcomeBanner
        title="Let's Get Started"
        description="Learn more about the grant and how GrantGenie platform works"
      />

      <ScreenLoader isLoading={isPending || pitchQuery.isLoading} />

      {showPage === "welcome-page" ? (
        <WelcomePage onNext={() => setShowPage("question-page")} />
      ) : (
        <QuestionPage
          employees={data?.data ?? []}
          questions={pitchQuery.data?.data[0].questions ?? null}
          hasSubmittedEmploees={
            pitchQuery.data?.data[0].employees_involved?.length !== 0
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

function convertToSurveyJS(jsonData: any) {
  const surveyJSON = {
    title: "",
    showPreviewBeforeComplete: "showAnsweredQuestions",
    pages: [] as any[],
  };

  const questions = jsonData;

  Object.keys(questions).forEach((key) => {
    const questionData = questions[key];

    // Remove line breaks from sample_answer
    const sanitizedSampleAnswer = questionData.sample_answer
      .replace(/\n/g, " ")
      .trim();

    const page = {
      elements: [
        {
          type: "comment",
          name: `question_${key}`,
          title: questionData.question.trim(),
          description: questionData.guidance.trim(),
          defaultValue: sanitizedSampleAnswer,
        },
      ],
    };

    surveyJSON.pages.push(page);
  });

  return surveyJSON;
}

type QuestionPageProps = {
  employees: EmployeeListResponse[];
  hasSubmittedEmploees: boolean;
  questions: PitchFlowResponse["questions"] | null;
};

const QuestionPage = (props: QuestionPageProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, success } = useToastHandlers();
  const [show, setShow] = useState(() => (props.questions ? true : false));

  const projectUUID = extractUUID(location.pathname);

  const questionMutation = useMutation<
    ApiResponse<Record<number, QuestionsLink>>,
    ApiResponseError
  >({
    mutationFn: async () =>
      await postRequest(
        `grants/pitchflows/${projectUUID}/generate-questions/`,
        {
          include_answers: true,
        }
      ),
    onSuccess() {
      setShow(!show);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: {
      topic: string;
      employees_involved: number[];
    }) => await patchRequest(`grants/pitchflows/${projectUUID}/`, payload),
    onSuccess() {
      questionMutation.mutate();
    },
    onError(err) {
      error("Pitch", err as ApiResponseError);
    },
  });

  const [fetchPdf] = useLazyQuery(
    ["generate-pdf", projectUUID],
    async () =>
      await getRequest(`grants/pitchflows/${projectUUID}/generate-pdf/`),
  );

  const answerMutation = useMutation({
    mutationFn: async (payload: any) =>
      await patchRequest(`grants/pitchflows/${projectUUID}/`, payload),
    onSuccess() {
      success("Answer Submission", "Answer submitted successfully");
      fetchPdf()
      navigate("/dashboard/projects");
    },
    onError(err) {
      error("Submitting Answer", err as ApiResponseError);
    },
  });

  const surveyJson = {
    showCompletedPage: true,
    completedHtml: "Saving and formulating questions...",
    pages: [
      {
        elements: [
          {
            name: "topic",
            title: "Firstly, do you have a topic in mind?",
            type: "text",
            isRequired: true,
          },
        ],
      },
      {
        elements: [
          {
            name: "employees",
            title: "Select employees involved in the project?",
            type: "checkbox",
            choices: props.employees.map((item) => ({
              value: item.id,
              text: item.name,
            })),
            isRequired: true,
          },
        ],
      },
    ],
  };

  const Json = show ? questionMutation.isSuccess
    ? convertToSurveyJS(questionMutation.data?.data ?? props.questions) : null
    : surveyJson;

  const survey = new Model(Json);

  survey.applyTheme(CustomSurveyPanelless);

  const handleComplete = (survey: Model) => {
    if (!show) {
      const payload = {
        employees_involved: survey.data.employees,
        topic: survey.data.topic,
      };

      mutate(payload);
      return;
    }

    const answers = Object.entries(survey.data).reduce((prev, curr) => {
      const index = curr?.[0]?.split?.("question_")?.[1];
      return {
        ...prev,
        [index]: curr?.[1],
      };
    }, {});

    answerMutation.mutate({ answers });
  };

  survey.onComplete.add(handleComplete);

  useEffect(() => {
    if (props.hasSubmittedEmploees && props.questions !== null) {
      questionMutation.mutate();
    }
  }, [props.hasSubmittedEmploees, props.questions]);

  return (
    <div className="mt-5">
      <ProgressBar {...{ survey }} />
      <img src={Logo} className="h-14 w-14" />

      <div className="h-full w-full bg-orange-900">
        <Survey model={survey} />
      </div>
    </div>
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

const ProgressBar = ({ survey }: { survey: Model}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgressBar = (): void => {
      const totalPages = survey?.pages?.length || 1;
      const currentPageNo = (survey?.currentPageNo || 0) + 1;
      const progress = (currentPageNo / totalPages) * 100;

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
        // progressBarRef.current.textContent = `${Math.round(progress)}%`;
      }
    };

    // Update the progress bar when the current page changes
    survey.onCurrentPageChanged.add(() => {
      updateProgressBar();
    });

    // Initial progress bar update
    updateProgressBar();
  }, [survey]);

  return (
    <div
    className={cn("border rounded-2xl w-full h-3 relative bg-indigo-100")}
  >
    <div
      ref={progressBarRef}
      className="w-0 h-full bg-primary text-center text-white rounded-2xl"
      style={{
        transition: "width 0.3s ease",
      }}
    ></div>
  </div>
  )
}