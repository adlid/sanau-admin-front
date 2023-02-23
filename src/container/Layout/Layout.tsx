import React, { FC } from "react";
import { Content } from "../Content/";
import { Header } from "../Header/Header";
import { TheSidebar } from "../Sidebar/";

const Layout: FC = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <div className="c-body">
          <Header />
          <Content />
        </div>
      </div>
    </div>
  );
};

export { Layout };
