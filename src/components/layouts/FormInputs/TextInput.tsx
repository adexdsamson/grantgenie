import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { File, Paperclip } from "lucide-react";
import { ReactNode } from "react";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | JSX.Element;
  containerClass?: string;
  error?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  helperText?: string;
};

export type TextFileProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | JSX.Element;
  containerClass?: string;
  error?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  helperText?: string;
  files: File[] | null;
  onChange: (value: File[] | null) => void;
};

export type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  rows?: number;
  containerClass?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  label?: string | JSX.Element;
};

export const TextInput = (props: TextInputProps) => {
  return (
    <div
      className={`flex flex-col font-medium w-full relative ${
        props.containerClass ?? ""
      }`}
    >
      <Label
        htmlFor={props.name}
        className="text-sm mb-3 block whitespace-nowrap text-[#0F172A] font-sans"
      >
        {props.label}
      </Label>

      <div className="relative">
        <Input {...props} id={props.name} className="peer pe-9" />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {props.endAdornment}
        </div>
      </div>

      <p
        className="mt-1 text-xs text-[#64748B] font-sans"
        role="alert"
        aria-live="polite"
      >
        {props.helperText}
      </p>

      <span className="text-xs text-red-500 mt-1">{props.error}</span>
    </div>
  );
};

export const TextArea = (props: TextAreaProps) => {
  return (
    <div
      className={`flex flex-col font-medium w-full relative ${
        props.containerClass ?? ""
      }`}
    >
      <Label className="flex flex-col justify-center text-sm whitespace-nowrap text-stone-900">
        {props.label}
      </Label>
      <div className="flex items-center bg-white rounded-lg border border-solid border-stone-300 py-1 mt-2 px-3 gap-1">
        <span>{props.startAdornment}</span>
        <Textarea
          {...props}
          className="w-full text-sm leading-5 border-0 text-stone-400 !focus-visible:ring-0 !ring-0 !focus:border-0 !focus:outline-none px-0 placeholder:text-xs placeholder:text-gray-300 flex-1 focus-visible:ring-offset-0"
        />
        <span>{props.endAdornment}</span>
      </div>
      <span className="text-xs text-red-500 mt-1">{props.error}</span>
    </div>
  );
};

const FileSvgDraw = () => {
  return (
    <>
      <File className="h-16 w-16 text-gray-500" />
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
      Drag and Drop files here or &nbsp;
        <span className="font-semibold underline">choose file</span>
      </p>
    </>
  );
};

export const TextFileUploader = (props: TextFileProps) => {
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <FileUploader
      {...props}
      value={props.files}
      onValueChange={(files) => props?.onChange?.(files)}
      dropzoneOptions={dropZoneConfig}
      className={cn("relative bg-background rounded-lg", props.containerClass)}
    >
      <FileInput className="outline-dashed outline-1 outline-white bg-gray-300 h-40">
        <div className="flex items-center justify-end h-full flex-col  pb-4 w-full ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {props.files &&
          props.files.length > 0 &&
          props.files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};
