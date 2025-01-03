import { Forger, FormPropsRef, useForge } from "@/lib/forge";
import {
  TextSurveyInput,
  TextSurveySelect,
} from "../components/TextSurveyInput";
import { Button } from "@/components/ui/button";
import { EmployeeListResponse } from "@/types";
import { useRef, useState } from "react";

export type SurveyData = {
  name: string;
  title: string;
  answer?: string;
  guidance?: string;
  type?: "input" | "checkbox";
  choices?: EmployeeListResponse[];
};

type WizardFormProps = {
  survey: SurveyData[];
  onSubmit: (value: any) => void;
  current: number;
  skipPreview: boolean;
  canGoToNextStep: boolean;
  canGoToPrevStep: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isLoading: boolean;
};

const getSurveyAnswers = (survey: WizardFormProps["survey"]) => {
  return survey.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.name]: curr.answer,
    };
  }, {});
};

export const WizardForm = (props: WizardFormProps) => {
  const [preview, setPreview] = useState(false);
  const formRef = useRef<FormPropsRef>(null);

  const { ForgeForm } = useForge({
    defaultValues: getSurveyAnswers(props.survey),
  });

  const renderInputs = props.survey.map((item, index) =>
    item.type === "input" ? (
      <Forger
        key={item.name}
        name={item.name}
        index={index + 1}
        label={item.title}
        description={item.guidance}
        component={TextSurveyInput}
      />
    ) : (
      <Forger
        key={item.name}
        name={item.name}
        index={index + 1}
        label={item.title}
        description={item.guidance}
        component={TextSurveySelect}
        employees={item.choices}
      />
    )
  );
  const renderPreviewInputs = props.survey.map((item, index) =>
    item.type === "input" ? (
      <Forger
        key={item.name}
        name={item.name}
        index={index + 1}
        label={item.title}
        labelClass="text-2xl"
        rows={6}
        description={item.guidance}
        component={TextSurveyInput}
      />
    ) : (
      <Forger
        key={item.name}
        name={item.name}
        index={index + 1}
        label={item.title}
        labelClass="text-2xl"
        description={item.guidance}
        component={TextSurveySelect}
        employees={item.choices}
      />
    )
  );

  const handleSubmit = (data: any) => {
    props.onSubmit(data);
  };

  if (preview) {
    return (
      <div className=" w-[60vw] mb-8">
        <ForgeForm
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-10"
        >
          {renderPreviewInputs}
        </ForgeForm>
        <div className="flex justify-end w-full mt-4 gap-3">
          <Button
            isLoading={props.isLoading}
            onClick={() => {
              formRef.current?.onSubmit();
            }}
          >
            Generate document
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[60vw] mb-8">
      <ForgeForm
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex items-center gap-5"
      >
        {renderInputs[props.current - 1]}
      </ForgeForm>

      <div className="flex justify-end w-full mt-4 gap-3">
        {props.canGoToPrevStep && (
          <Button variant={"outline"} onClick={props.goToPrevStep}>
            Previous
          </Button>
        )}
        {props.canGoToNextStep && (
          <Button onClick={props.goToNextStep}>Next</Button>
        )}
        {!props.canGoToNextStep && (
          <Button
            onClick={() =>
              props.skipPreview
                ? formRef.current?.onSubmit()
                : setPreview((prev) => !prev)
            }
          >
            Preview
          </Button>
        )}
      </div>
    </div>
  );
};
