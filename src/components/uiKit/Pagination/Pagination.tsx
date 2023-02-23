import React, { FC, useEffect } from "react";

import { ReactComponent as ArrowRight } from "../../../assets/imgs/arrowRight.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/imgs/arrowLeft.svg";

import { CPagination } from "@coreui/react";

type PropsType = {
  totalPage: number;
  page: number;
  onPageChanged?: (page: number) => void;
};

const Pagination: FC<PropsType> = ({ totalPage, page, onPageChanged }) => {
  const [currentPage, setActivePage] = React.useState(page);

  useEffect(() => {
    setActivePage(page);
  }, [page]);

  return (
    <CPagination
      activePage={currentPage}
      pages={totalPage}
      doubleArrows={false}
      onActivePageChange={(i: number) => {
        if (i !== 0) {
          setActivePage(i);
          if (onPageChanged) {
            onPageChanged(i);
          }
        }
      }}
      nextButton={<ArrowRight />}
      previousButton={<ArrowLeft />}
    />
  );
};

export { Pagination };
