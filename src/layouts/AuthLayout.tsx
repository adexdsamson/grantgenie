import Container from "@/components/layouts/Container";
import { Outlet } from "react-router-dom";
import GrantGenieLogo from "@/assets/GrantGenie Logo.svg";

export const AuthLayout = () => {
  return (
    <Container
      noGutter
      fullWidth
      fullHeight
      display="flex"
      className="overflow-hidden dark:bg-slate-950 bg-[#F7F9FE]"
    >
      <div className="flex gap-5 max-md:flex-col">
        <section className="flex flex-col w-[40rem] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start pt-16 pr-20 w-full text-white bg-[#483F6F] max-md:mt-10 max-md:max-w-full">
            <div className="flex items-center gap-1 pl-5">
              <img src={GrantGenieLogo} className="" />
              <h1 className="text-5xl font-extrabold tracking-tight leading-none max-md:ml-2.5 max-md:text-4xl">
                GrantGenie
              </h1>
            </div>
            <p className="mt-2 ml-8 text-base leading-7 max-md:max-w-full">
              Join thousands of successful entrepreneurs who've simplified their
              grant application process
            </p>
            <div className="flex shrink-0 mt-24 max-w-full h-[739px] w-[513px] max-md:mt-10" />
          </div>
        </section>

        <section className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <Outlet />
        </section>
      </div>
    </Container>
  );
};
