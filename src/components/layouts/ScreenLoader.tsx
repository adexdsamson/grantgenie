import Spinner from "../ui/Spinner";

export const ScreenLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null;
  }

  
  return (
    <div className="h-full w-full bg-black/30 flex items-center justify-center fixed top-0 left-0 z-[10000]">
      <Spinner />
    </div>
  );
};
