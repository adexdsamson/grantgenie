import Container from "@/components/layouts/Container";
import { SideBar } from "./Sidebar";
import { Header } from "./Header";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Dashboard = (props: { children: JSX.Element }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [show, setShow] = useState<boolean>(isMobile ? false : true);
  

  return (
    <Container
      noGutter
      fullWidth
      fullHeight
      display="flex"
      className="overflow-x-hidden overflow-y-auto dark:bg-slate-950 bg-[#BCBDD3] relative"
    >
      <SideBar show={show} setShow={setShow} />

      <Container
        noGutter
        className="flex-1 overflow-auto rounded-lg bg-white my-2 mx-2"
      >
        <Header show={show} setShow={setShow} title="Dashboard" />

        <Container>
          {props.children}
        </Container>
      </Container>
    </Container>
  );
};
