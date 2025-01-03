import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-100 py-20 sm:px-6 px-4 rounded-md mt-32">
      <div className="max-w-4xl w-full mx-auto text-center">
        <h2 className="md:text-4xl text-3xl font-extrabold">
          Ready to Transform Your Funding Journey?
        </h2>
        <p className="mt-6">
          GrantGenie is here to empower your ambitions and simplify your path to
          success. Join our growing community of innovators, businesses, and
          professionals achieving more with less effort.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 rounded-md text-white bg-primary mt-5 transition-all hover:bg-primary/80"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
