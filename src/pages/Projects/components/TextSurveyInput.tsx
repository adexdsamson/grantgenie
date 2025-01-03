import { TextAreaProps } from "@/components/layouts/FormInputs/TextInput";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EmployeeListResponse } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
} from "draft-js";
import { useEditor } from "@/hooks/useEditor";
import { useState } from "react";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";

export const TextSurveyInput = ({
  name,
  label,
  index,
  description,
  ...rest
}: TextAreaProps & {
  index: number;
  description: string;
  labelClass: string;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const rawObject = markdownToDraft((rest.value as string) ?? "");
  const contentState = convertFromRaw(rawObject);
  const editorState = EditorState.createWithContent(contentState);


  const { editorRef, ...editorProps } = useEditor({
    onChange(editorState) {
      const rawObject = convertToRaw(editorState.getCurrentContent());
      const markdownString = draftToMarkdown(rawObject)

      if(!rest.onChange) return;
      rest.onChange({ target: { value: markdownString } as any } as any)
    },
    editorState: EditorState.moveFocusToEnd(editorState)
  });

  return (
    <div className={cn("space-y-2 w-full", rest.containerClass)}>
      <Label
        htmlFor={name}
        className={cn(
          "text-3xl block",
          { "mb-5": !description },
          rest.labelClass
        )}
      >
        {label}
      </Label>
      {description && (
        <div id={name} className="py-4 border-y-2 !my-5">
          <h6 className="text-base">Question guidance</h6>
          <span className="mt-3 text-sm text-gray-400">{description}</span>
        </div>
      )}

      <div
        className={cn("w-full p-2 rounded-xl ring-slate-950 ring-offset-2 ring-2", {
          "ring-slate-950 ring-offset-2 ring-2": isFocus,
        })}
      >
        <Editor
          ref={editorRef}
          {...editorProps}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
      </div>
    </div>
  );
};

export const TextSurveySelect = ({
  name,
  label,
  value,
  onChange,
  employees,
  labelClass,
}: {
  name: string;
  label: string;
  labelClass: string;
  onChange: any;
  value: number[];
  employees: EmployeeListResponse[];
}) => {
  return (
    <div className={cn("space-y-2 w-full")}>
      <Label htmlFor={name} className={cn("text-3xl block mb-5", labelClass)}>
        {label}
      </Label>

      {employees.map((item) => (
        <div
          key={item.id}
          className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring mt-3"
        >
          <Checkbox
            name={name}
            checked={value?.includes(item.id)}
            onCheckedChange={(checked) => {
              return checked
                ? onChange([...value, item.id])
                : onChange(value?.filter((value) => value !== item.id));
            }}
            className="order-1 after:absolute after:inset-0"
            aria-describedby={`${name}-description`}
          />
          <div className="grid grow gap-2">
            <Label htmlFor="radio-08-r1">{item.name} </Label>
            <p
              id="radio-08-r1-description"
              className="text-xs text-muted-foreground"
            >
              {item.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
