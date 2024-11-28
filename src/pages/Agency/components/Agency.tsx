
export interface ProfileCardProps {
  imageUrl: string;
  name: string;
}

export function ProfileCard({ imageUrl, name }: ProfileCardProps) {
  return (
    <article className="flex flex-col justify-center p-6 text-xs font-medium leading-4 text-center bg-white rounded-md border border-solid border-slate-200 max-w-[228px] text-slate-700">
      <section className="flex flex-col justify-center w-full">
        <header className="flex flex-col justify-center items-center py-2.5 w-full">
          <ProfileImage imageUrl={imageUrl} alt={name} />
          <h2 className="mt-2">{name}</h2>
        </header>
      </section>
    </article>
  );
}

interface ProfileImageProps {
  imageUrl: string;
  alt: string;
}

function ProfileImage({ imageUrl, alt }: ProfileImageProps) {
  return (
    <img
      loading="lazy"
      src={imageUrl}
      alt={alt}
      className="object-contain max-w-full rounded-full aspect-square w-[138px]"
    />
  );
}
