import { useNavigate } from "react-router-dom";

export const Heropage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="px-4 sm:px-10">
        <div className="mt-24 max-w-4xl mx-auto text-center relative z-10">
          <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
            Unlocking Funding Opportunities Seamlessly
          </h1>
          <p className="text-base">
            Your smart, all-in-one solution for grant discovery, application,
            and management. Save time, win more grants, and focus on what truly
            matters – your mission. Be part of businesses win tens of millions
            worth of government grants for incredible projects
          </p>
          <div className="mt-10">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-xl text-white bg-primary transition-all hover:bg-primary/80"
            >
              Get started today
            </button>
          </div>
        </div>
        <hr className="my-12 border-gray-200" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center"></div>
      </div>
      <img
        src="https://readymadeui.com/bg-effect.svg"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
