import Container from "@/components/layouts/Container";
import { Outlet } from "react-router-dom";
import { SideBar } from "./Sidebar";
import { Header } from "./Header";
import { useState } from "react";

export const Dashboard = () => {
  const [show, setShow] = useState<boolean>(false);

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
        <Header show={show} setShow={setShow} />

        <Container>
          <Outlet />
        </Container>
      </Container>
    </Container>
  );
};
