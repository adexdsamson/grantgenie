import { TextAreaProps } from "@/components/layouts/FormInputs/TextInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EmployeeListResponse } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

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
  return (
    <div className={cn("space-y-2 w-full max-w-2xl", rest.containerClass)}>
      <Label
        htmlFor={name}
        className={cn(
          "text-3xl block",
          { "mb-5": !description },
          rest.labelClass
        )}
      >
        {index}. {label}
      </Label>
      {description && (
        <div id={name} className="py-4 border-y-2 !my-5">
          <h6 className="text-base">Question guidance</h6>
          <span className="mt-3 text-sm text-gray-400">{description}</span>
        </div>
      )}
      <Textarea
        {...rest}
        id={name}
        rows={rest.rows ?? 7}
        autoFocus
        className="bg-muted shadow-none w-full"
        placeholder=""
      />
    </div>
  );
};

export const TextSurveySelect = ({
  name,
  label,
  value,
  index,
  onChange,
  employees,
  labelClass
}: {
  name: string;
  label: string;
  labelClass: string;
  onChange: any;
  value: number[];
  index: number;
  employees: EmployeeListResponse[];
}) => {
  return (
    <div className={cn("space-y-2 w-full max-w-2xl")}>
      <Label htmlFor={name} className={cn("text-3xl block mb-5", labelClass)}>
        {index}. {label}
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
