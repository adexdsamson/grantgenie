export interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <article className="flex flex-col self-stretch my-auto bg-white rounded-xl border border-solid border-slate-200 min-w-[240px] w-full">
      <header className="flex flex-col p-5 w-full">
        <h3 className="text-sm leading-none text-black text-opacity-60">
          {title}
        </h3>
        <p className="self-start mt-4 text-4xl leading-none text-black whitespace-nowrap">
          {value}
        </p>
      </header>
      <footer className="gap-2.5 self-stretch px-2 py-1 w-full text-xs leading-loose rounded-none bg-zinc-300 bg-opacity-40 text-black text-opacity-60">
        {description}
      </footer>
    </article>
  );
}
