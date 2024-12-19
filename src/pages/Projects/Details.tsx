import { useEffect, useMemo, useRef, useState } from "react";
import { SidebarNav } from "./components/NavigationItem";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Boxes, Building, Database, Edit } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Logo from "@/assets/GrantGenie Logo.svg";
import { CompleteEvent, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { CustomSurveyPanelless } from "./constants";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ApiResponseError, EmployeeListResponse } from "@/types";
import { getRequest } from "@/lib/axiosInstance";

export const navigationItems = [
  {
    text: "Welcome to your GrantGenie application",
    isActive: true,
    iconSrc: Boxes,
  },
  {
    text: "The United Nations Democracy Fund Program",
    isActive: false,
    iconSrc: Building,
  },
  {
    text: "Application Planning",
    isActive: false,
    iconSrc: Database,
  },
  {
    text: "Research for My Application",
    isActive: false,
    iconSrc: Edit,
  },
];

export const ProjectDetail = () => {
  const [showPage, setShowPage] = useState<"welcome-page" | "question-page">(
    "welcome-page"
  );

  const { data, isPending } = useQuery<
    ApiResponse<EmployeeListResponse[]>,
    ApiResponseError
  >({
    queryKey: ["employee-lists"],
    queryFn: async () => await getRequest("grants/employees/"),
  });

  return (
    <div className="">
      <WelcomeBanner
        title="Let's Get Started"
        description="Learn more about the grant and how GrantGenie platform works"
      />

      {showPage === "welcome-page" ? (
        <WelcomePage onNext={() => setShowPage("question-page")} />
      ) : (
        <QuestionPage employees={data?.data ?? []} />
      )}
    </div>
  );
};

const WelcomePage = (props: { onNext: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTab = () => {
    navigationItems.length === activeTab
      ? props.onNext()
      : setActiveTab((prev) => prev + 1);
  };

  return (
    <div className="mt-14 w-full max-w-[1098px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full mb-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
          {navigationItems.map((item, index) => (
            <SidebarNav
              key={index}
              index={index}
              text={item.text}
              iconSrc={item.iconSrc}
              isActive={index === activeTab}
              lastItem={navigationItems.length - 1}
            />
          ))}
        </div>

        <ScrollArea>
          <div className="flex flex-col ml-5 h-[36rem] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-black max-md:mt-6 max-md:max-w-full">
              <div className="text-3xl font-semibold tracking-tight leading-9 w-">
                Welcome to your GrantGenie application
              </div>
              <div className="mt-4 text-base leading-7 max-md:max-w-full">
                Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus. Maecenas eget condimentum velit,
                sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Praesent
                auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
                urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                diam sit amet lacinia. Aliquam in elementum tellus.
                <br /> Curabitur tempor quis eros tempus lacinia. Nam bibendum
                pellentesque quam a convallis. Sed ut vulputate nisi. Integer in
                felis sed leo vestibulum venenatis. Suspendisse quis arcu sem.
                Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
                magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices
                nibh. Mauris sit amet magna non ligula vestibulum eleifend.
                Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus
                lobortis eleifend. Sed nec ante dictum sem condimentum
                ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac
                posuere leo.
                <br /> Nam pulvinar blandit velit, id condimentum diam faucibus
                at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum
                congue felis. Quisque mauris dolor, fringilla sed tincidunt ac,
                finibus non odio. Sed vitae mauris nec ante pretium finibus.
                Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula.
                Nullam dictum, tellus tincidunt tempor laoreet, nibh elit
                sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean
                gravida turpis nisi, consequat dictum risus dapibus a. Duis
                felis ante, varius in neque eu, tempor suscipit sem. Maecenas
                ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus
                vitae justo pharetra consequat. Mauris id mi ut arcu feugiat
                maximus. Mauris consequat tellus id tempus aliquet.
                <br /> Vestibulum dictum ultrices elit a luctus. Sed in ante ut
                leo congue posuere at sit amet ligula. Pellentesque eget augue
                nec nisl sodales blandit sed et sem. Aenean quis finibus arcu,
                in hendrerit purus. Praesent ac aliquet lorem. Morbi feugiat
                aliquam ligula, et vestibulum ligula hendrerit vitae. Sed ex
                lorem, pulvinar sed auctor sit amet, molestie a nibh. Ut euismod
                nisl arcu, sed placerat nulla volutpat aliquet. Ut id convallis
                nisl. Ut mauris leo, lacinia sed elit id, sagittis rhoncus odio.
                Pellentesque sapien libero, lobortis a placerat et, malesuada
                sit amet dui. Nam sem sapien, congue eu rutrum nec, pellentesque
                eget ligula.
                <br /> Nunc tempor interdum ex, sed cursus nunc egestas aliquet.
                Pellentesque interdum vulputate elementum. Donec erat diam,
                pharetra nec enim ut, bibendum pretium tellus. Vestibulum et
                turpis nibh. Cras vel ornare velit, ac pretium arcu. Cras justo
                augue, finibus id sollicitudin et, rutrum eget metus.
                Suspendisse ut mauris eu massa pulvinar sollicitudin vel sed
                enim. Pellentesque viverra arcu et dignissim vehicula. Donec a
                velit ac dolor dapibus pellentesque sit amet at erat. Phasellus
                porttitor, justo eu ultrices vulputate, nisi mi placerat lectus,
                sed rutrum tellus est id urna. Aliquam pellentesque odio metus,
                sit amet imperdiet nisl sodales eu. Quisque viverra nunc nec
                vestibulum dapibus. Integer nec diam a libero tincidunt varius
                sed vel odio. Donec rutrum dapibus massa, vel tempor nulla porta
                id. Suspendisse vulputate fermentum sem sollicitudin facilisis.
                Aliquam vehicula sapien nec ante auctor, quis mollis leo
                tincidunt.
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="flex items-center justify-end mt-5">
        <Button onClick={handleTab}>Next</Button>
      </div>
    </div>
  );
};

const sampleQuestions = {
  questions_json: {
    "1": {
      question:
        "What specific objectives does your project aim to achieve with the Test Grant funding?  ",
      sample_answer:
        "Our project aims to leverage the Test Grant funding to advance the development of an automated system for assisting archaeologists in reconstructing excavated frescoes. The primary objective is to enhance our statistical model of fracture patterns by implementing physics-based simulations and high-speed video analysis to verify and refine our existing algorithms. With the grant, we plan to develop a prototype that integrates these advanced methods, allowing for more accurate and efficient reconstruction processes. Additionally, the funding will support pilot studies to test the prototype in real-world archaeological settings, ensuring its practical applicability and effectiveness. Achieving these objectives will not only improve our understanding of fracture processes but also contribute significantly to the field of cultural heritage preservation, offering archaeologists a powerful tool for historical reconstruction and analysis.",
      guidance:
        "When answering the question about the specific objectives your project aims to achieve with the Test Grant funding, it is essential to clearly articulate the goals that align with both the grant's purpose and your project's needs. Begin by briefly outlining the primary aim of your project and how it addresses a particular problem or opportunity. Then, specify the key objectives that the Test Grant will help you accomplish, such as developing a prototype, conducting pilot studies, or expanding research capabilities. Ensure that these objectives are measurable, achievable within the grant's timeframe, and directly linked to the anticipated outcomes or impacts of your project. Highlight how achieving these objectives will contribute to the broader goals of the project and potentially benefit the community or field of study.",
    },
    "2": {
      question:
        "How does your project align with the agency's mission and priorities?  ",
      sample_answer:
        "Our \"Test Grant\" project aligns seamlessly with the agency's mission to advance technological innovation and preserve cultural heritage. By developing an automated system to assist archaeologists in reconstructing excavated frescoes, we directly support the agency's priority of leveraging technology for cultural preservation. Our project utilizes cutting-edge computer graphics techniques to analyze fracture patterns, which not only enhances archaeological research but also contributes to the agency's goal of fostering interdisciplinary collaboration. Furthermore, our work has the potential for long-term benefits by improving reconstruction algorithms, thereby preserving historical artifacts for future generations. This alignment with the agency's mission underscores our commitment to innovation and cultural impact.",
      guidance:
        "When addressing the question of how your project aligns with the agency's mission and priorities, it is essential to first thoroughly understand the agency's stated goals, values, and strategic objectives. Begin by clearly articulating the core objectives of your \"Test Grant\" project, ensuring they resonate with the agency's mission. Highlight specific elements of your project that directly support or enhance the agency's priorities, such as innovation, community impact, or sustainability. Use concrete examples to demonstrate alignment, such as how your project addresses a particular challenge the agency is focused on or how it leverages existing agency initiatives. Emphasize any collaborative aspects or potential for long-term benefits that align with the agency's vision, ensuring your response is concise, focused, and tailored to the agency's specific goals.",
    },
    "3": {
      question:
        "What is the estimated timeline for the completion of your project?  ",
      sample_answer:
        'The estimated timeline for the completion of our project under the "Test Grant" is approximately 18 months. This includes an initial 3-month phase for detailed research and development, followed by a 6-month period dedicated to testing and refining our automated system for fresco reconstruction. We anticipate a further 5 months for evaluation and integration of feedback, ensuring the system meets all specified requirements. The final 4 months will be allocated to documentation and dissemination of results, including publication and presentations at relevant symposiums. We have accounted for potential delays due to resource availability and regulatory approvals, incorporating a buffer to ensure alignment with the grant\'s objectives and deadlines. This structured timeline reflects our commitment to delivering a successful and impactful project.',
      guidance:
        'When estimating the timeline for the completion of a project under a "Test Grant," it is essential to consider several key factors outlined in the project requirements. Begin by identifying all major milestones and deliverables specified in the grant proposal, and assess the time needed for each phase, including research, development, testing, and evaluation. Consider any dependencies or potential bottlenecks that might affect progress, such as resource availability or regulatory approvals. Incorporate buffer time for unforeseen challenges and ensure alignment with any deadlines stipulated by the grant. Communicate this timeline clearly, highlighting how it aligns with the grant\'s objectives and demonstrating a realistic and well-structured plan for successful project completion.',
    },
    "4": {
      question:
        "What measurable outcomes do you anticipate as a result of this grant?  ",
      sample_answer:
        'As a result of the "Test Grant," we anticipate several measurable outcomes aligned with our research objectives in computer graphics, particularly in the reconstruction of excavated frescoes. Firstly, we aim to increase the accuracy of our automated reconstruction system by 20% through the implementation of advanced statistical models and physics-based heuristics. We also plan to conduct at least 50 simulation tests to validate our fracture process model. Additionally, we expect to reduce the time required for manual reconstruction by 30% by enhancing our algorithms. Qualitatively, we aim to improve collaboration with archaeologists, as evidenced by increased engagement and feedback during workshops. These outcomes will be achieved within the grant period, ensuring that the funding directly contributes to advancing our research and its applications in cultural heritage.',
      guidance:
        'When addressing the question of anticipated measurable outcomes for the "Test Grant," it is essential to align your response with the specific objectives and requirements outlined in the project proposal. Begin by clearly identifying the key goals of the project and then articulate the specific metrics that will be used to evaluate success. These metrics could include quantitative outcomes such as the number of tests conducted, the percentage increase in test accuracy, or the reduction in testing time. Additionally, consider qualitative outcomes like improved stakeholder satisfaction or enhanced community engagement. Ensure that these outcomes are realistic, time-bound, and directly linked to the grant\'s purpose, demonstrating a clear understanding of how the funding will drive tangible results.',
    },
    "5": {
      question:
        "How will you ensure compliance with the agency's reporting and accountability standards?  ",
      sample_answer:
        "To ensure compliance with the agency's reporting and accountability standards for the Test Grant, I will establish a robust framework that includes clear documentation, regular monitoring, and transparent communication. I will begin by thoroughly reviewing the agency's guidelines and aligning our project requirements with these standards. A detailed reporting schedule will be developed, outlining key milestones and deliverables, ensuring all team members are aware of their responsibilities. I will implement a system for tracking progress and collecting data to facilitate accurate and timely reporting. Regular internal audits will be conducted to identify discrepancies or areas for improvement, which will be addressed promptly. Open communication with the agency will be fostered by providing updates and seeking feedback to ensure all reporting aligns with their expectations. Additionally, I will ensure staff are trained on compliance requirements and maintain comprehensive records to support adherence to the agency's standards.",
      guidance:
        "To ensure compliance with the agency's reporting and accountability standards for the Test Grant, it is essential to establish a robust framework that includes clear documentation, regular monitoring, and transparent communication. Begin by thoroughly reviewing the agency's guidelines and aligning the project requirements with these standards. Develop a detailed reporting schedule that outlines key milestones and deliverables, ensuring that all team members are aware of their responsibilities. Implement a system for tracking progress and collecting data, which will facilitate accurate and timely reporting. Regularly conduct internal audits to identify any discrepancies or areas for improvement, and address them promptly. Foster open communication with the agency by providing updates and seeking feedback to ensure that all reporting aligns with their expectations. Additionally, training staff on compliance requirements and maintaining comprehensive records will further support adherence to the agency's standards.",
    },
    "6": {
      question:
        "What is your plan for sustaining the project after the grant period ends?  ",
      sample_answer:
        "To sustain the \"Test Grant\" project after the grant period ends, we plan to pursue a multi-faceted approach. First, we will seek additional funding through partnerships with local businesses and apply for grants that align with our project's objectives. We also aim to generate revenue by offering specialized services related to our research, such as workshops or consulting in computer graphics applications for cultural heritage. Building a strong network of stakeholders, including volunteers and community leaders, will be crucial for ongoing support. We will implement a robust evaluation and feedback system to continuously adapt and improve the project. Additionally, leveraging technology and digital platforms will help us expand our reach and reduce operational costs, ensuring the project's long-term sustainability and impact.",
      guidance:
        "When addressing the question of sustaining the \"Test Grant\" project post-grant period, it is crucial to outline a comprehensive strategy that ensures the project's longevity and continued impact. Begin by identifying potential funding sources, such as partnerships with local businesses, community fundraising efforts, or applying for additional grants that align with the project's goals. Highlight any plans to generate revenue through project-related services or products, if applicable. Emphasize the importance of building a strong network of stakeholders, including volunteers, community leaders, and beneficiaries, to foster ongoing support and engagement. Additionally, discuss the implementation of a robust evaluation and feedback mechanism to adapt and improve the project, ensuring its relevance and effectiveness over time. Lastly, consider leveraging technology and digital platforms to expand reach and reduce operational costs, thereby enhancing the project's sustainability.",
    },
    "7": {
      question:
        "How does your project address any potential risks or challenges?  ",
      sample_answer:
        "Our project addresses potential risks and challenges by implementing a comprehensive risk management strategy tailored to the unique demands of developing an automated system for archaeological fresco reconstruction. Key risks include technical challenges in accurately modeling brittle fracture patterns and operational hurdles in integrating our system with existing archaeological workflows. To mitigate these, we have adopted robust testing protocols, including simulations using physics-based heuristics and high-speed video analysis, to validate our fracture models. Financially, we have secured contingency funding to ensure project continuity in case of unforeseen expenses. We also maintain clear communication channels with stakeholders, including archaeologists and technical experts, to ensure alignment and timely resolution of any issues. Additionally, we employ risk assessment tools to proactively identify and address potential challenges, ensuring our project's resilience and commitment to achieving its objectives.",
      guidance:
        "When addressing the question of how your project tackles potential risks or challenges in the context of a 'Test Grant,' it is crucial to demonstrate a thorough understanding of both the project requirements and the specific risks associated with your initiative. Begin by identifying key risks, such as technical, financial, or operational challenges, that could impact the project's success. Then, outline the strategies and measures you have implemented to mitigate these risks, such as adopting robust testing protocols, securing contingency funding, or establishing clear communication channels among stakeholders. Highlight any risk assessment tools or methodologies you have employed to proactively identify and address potential issues. By showcasing a comprehensive risk management plan, you reassure grant evaluators of your project's resilience and your commitment to achieving its objectives despite potential obstacles.",
    },
    "8": {
      question:
        "What is the total budget required, and how will the Test Grant be allocated?  ",
      sample_answer:
        "The total budget required for the Test Grant project is estimated at $150,000. This includes $60,000 for personnel costs, covering salaries for researchers and assistants involved in the project. An additional $40,000 is allocated for materials and equipment necessary for the development and testing of the automated system for fresco reconstruction. Travel and workshop expenses are budgeted at $20,000, facilitating collaboration and presentation opportunities at archaeological sites and conferences. A contingency fund of $10,000 is included to address any unforeseen expenses. The remaining $20,000 is designated for software development and data analysis tools, ensuring robust support for the project's computational needs.\n\nThe Test Grant will be allocated as follows: 40% towards personnel costs, 27% for materials and equipment, 13% for travel and workshops, 7% for contingency, and 13% for software and data analysis tools. This allocation plan is designed to align with the project's objectives, ensuring that each component is adequately funded to maximize the impact and success of the research.",
      guidance:
        "To effectively answer the question regarding the total budget required and the allocation of the Test Grant, begin by thoroughly reviewing the project requirements to understand the scope and objectives. Identify all necessary expenses, including personnel, materials, equipment, and any other resources essential for the project's success. Calculate the total budget by summing these costs, ensuring to include a contingency fund for unforeseen expenses. For the Test Grant allocation, outline a detailed plan that specifies how the grant funds will be distributed across different project components, aligning with the project's priorities and goals. Ensure transparency and justification for each allocation to demonstrate how it supports the project's objectives and maximizes the impact of the grant.",
    },
    "9": {
      question:
        "Who are the key personnel involved, and what are their qualifications?  ",
      sample_answer:
        "The key personnel involved in the Test Grant project include the principal investigator, a computer science researcher from Princeton University with a focus on computer graphics and a strong background in analyzing fracture patterns in archaeological frescoes. This individual has published research at the VAST International Symposium and is actively collaborating on advanced simulation methods. Under the supervision of Professor Thomas Funkhouser, they have developed a statistical model for crack patterns, contributing significantly to computer-assisted reconstruction algorithms. The team also includes a graduate student specializing in high-speed video analysis of fracture processes, enhancing the project's technical depth. Collaborative partners from the archaeological site of Akrotiri provide valuable historical context and resources, ensuring a comprehensive approach to the project's objectives.",
      guidance:
        "When addressing the question \"Who are the key personnel involved, and what are their qualifications?\" in the context of a Test Grant and its project requirements, it is essential to identify individuals whose expertise and experience align with the project's objectives. Start by listing the principal investigator or project leader, highlighting their academic background, relevant experience, and any notable achievements in the field. Next, introduce other critical team members, such as co-investigators, project managers, and technical specialists, detailing their specific roles and contributions to the project. Emphasize their qualifications, such as advanced degrees, certifications, or prior work on similar projects, to demonstrate their capability to meet the grant's goals. Additionally, mention any collaborative partners or institutions involved, underscoring their expertise and resources that will support the project's success.",
    },
    "10": {
      question: "How will you evaluate the success and impact of your project?",
      sample_answer:
        "To evaluate the success and impact of the 'Test Grant' project, we will first define specific objectives and outcomes based on the project requirements. Key performance indicators (KPIs) will be established, focusing on measurable improvements in testing processes, accuracy, and efficiency. We will collect quantitative data, such as test result metrics and time savings, alongside qualitative feedback from stakeholders to assess effectiveness. Additionally, we will evaluate the broader impact, including contributions to organizational goals and benefits to the target community. Progress will be regularly reviewed against these metrics, with strategies adjusted as necessary to ensure alignment with the project's intended impact.",
      guidance:
        "To effectively evaluate the success and impact of your 'Test Grant' project, begin by clearly defining the specific objectives and outcomes outlined in the project requirements. Establish key performance indicators (KPIs) that align with these objectives, such as measurable improvements in testing processes, enhanced accuracy, or increased efficiency. Collect both quantitative data, such as test result metrics and time savings, and qualitative feedback from stakeholders to assess the project's effectiveness. Additionally, consider the broader impact, such as how the project contributes to organizational goals or benefits the target community. Regularly review progress against these metrics and adjust strategies as needed to ensure alignment with the project's intended impact.",
    },
  },
};

function convertToSurveyJS(jsonData: any) {
  const surveyJSON = {
    title: "",
    showPreviewBeforeComplete: "showAnsweredQuestions",
    pages: [] as any[],
  };

  const questions = jsonData.questions_json;

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

const QuestionPage = (props: { employees: EmployeeListResponse[] }) => {
  const [show, setShow] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const surveyJson = {
    showCompletedPage: false,
    pages: [
      {
        elements: [
          {
            name: "topic",
            title: "Firstly, do you have a topic in mind?",
            type: "text",
          },
        ],
      },
      {
        elements: [
          {
            name: "satisfaction-score",
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

  const survey = new Model(
    show ? convertToSurveyJS(sampleQuestions) : surveyJson
  );
  survey.applyTheme(CustomSurveyPanelless);

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

  const handleComplete = (survey: Model, option: CompleteEvent) => {
    setShow(!show);
  };

  survey.onComplete.add(handleComplete);

  return (
    <div className="mt-5">
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
      <img src={Logo} className="h-14 w-14" />

      <div className="h-full w-full bg-orange-900">
        <Survey model={survey} />
      </div>
    </div>
  );
};
