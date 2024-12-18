import * as React from "react";

export interface WelcomeBannerProps {
    title: string;
    description: string;
  }

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ title, description }) => {
  return (
    <div className="flex justify-between items-start px-6 py-6 mt-9 rounded-2xl bg-indigo-300 bg-opacity-40 max-md:px-5">
      <div className="flex flex-col rounded-none min-w-[240px] w-[417px]">
        <div className="self-start text-2xl font-semibold tracking-normal leading-none text-black">
          {title}
        </div>
        <div className="mt-1.5 text-sm leading-none text-slate-700">
          {description}
        </div>
      </div>
    </div>
  );
};