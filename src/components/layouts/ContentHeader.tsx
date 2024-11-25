  
  interface ProjectHeaderProps {
    title: string;
    description: string;
  }
  
  export const ContentHeader: React.FC<ProjectHeaderProps> = ({
    title,
    description,
  }) => {
    return (
      <section className="flex flex-col rounded-none min-w-[240px] w-[652px] max-md:max-w-full">
        <h1 className="self-start text-2xl font-semibold tracking-normal leading-none text-black">
          {title}
        </h1>
        <p className="mt-1.5 text-base leading-6 text-slate-700 max-md:max-w-full">
          {description}
        </p>
      </section>
    );
  };