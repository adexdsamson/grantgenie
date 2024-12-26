import Container from "@/components/layouts/Container";
import GrantGenieLogo from "@/assets/GrantGenie Logo.svg";
import BusinessMan from "@/assets/businessMan.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

export const AuthLayout = (props: { children: ReactNode }) => {
  return (
    <Container
      noGutter
      fullWidth
      fullHeight
      display="flex"
      className="overflow-hidden dark:bg-slate-950 bg-white"
    >
      <div className="flex gap-5 max-md:flex-col w-full">
        <section className="flex flex-col w-[40rem] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start pt-8 pr-20 w-full text-white bg-[#483F6F] max-md:mt-10 max-md:max-w-full relative">
            <div className="flex items-center gap-1 pl-5">
              <img src={GrantGenieLogo} className="" />
              <h1 className="text-5xl font-extrabold tracking-tight leading-none max-md:ml-2.5 max-md:text-4xl">
                GrantsGenie
              </h1>
            </div>
            <p className="mt-2 ml-8 text-base leading-7 max-md:max-w-full">
              Join thousands of successful entrepreneurs who've simplified their
              grant application process
            </p>
            {/* <div className="flex shrink-0 mt-24 max-w-full h-[739px] w-[513px] max-md:mt-10" /> */}
            <div className="h-[40rem]  absolute bottom-1">
              <img src={BusinessMan} className="h-full w-full object-contain" />
            </div>
          </div>
        </section>

        <section className="flex flex-1 h-full max-md:ml-0 max-md:w-full">
          <ScrollArea className="w-full">
            <Container className="w-full">
              {props.children}
            </Container>
          </ScrollArea>
        </section>
      </div>
    </Container>
  );
};
