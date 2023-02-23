import React, { useEffect, useRef, useState } from "react";
// components
import { Left } from "./components/Left/Left";
import { RightBody } from "./components/RightBody/RightBody";
import { RightHeader } from "./components/RightHeader/RightHeader";
// redux
import { useAppDispatch, useWindowSize } from "../../utils/hooks/reduxHooks";
import { getGroupTreeBySearchThunk } from "../../store/slicesAndThunks/groupControl/groupControl.thunks";

export const USPDLogs = () => {
  // hooks
  const dispatch = useAppDispatch();
  const [width, height] = useWindowSize(); // on window resize listener

  //   other handlers
  const [searchValue, setSearchValue] = useState("");
  const [fetching, setFetching] = useState<boolean>(false);
  const [logsFetching, setLogsFetching] = useState<boolean>(false);

  const onTreeItemClick = () => {};

  const getGroupTree = async () => {
    setFetching(true);
    await dispatch(getGroupTreeBySearchThunk({ query: searchValue, type: "electric", field: "" }));
    setFetching(false);
  };

  useEffect(() => {
    getGroupTree();
  }, []);

  const headerRef: any = useRef();
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight || 0);
  });

  useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight || 0);
  }, [width, height]);

  return (
    <>
      <div className="uspdLogs">
        <Left
          fetching={fetching}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onTreeItemClick={onTreeItemClick}
        />

        <div className="uspdLogs_right">
          <RightHeader headerRef={headerRef} />
          <RightBody logsFetching={logsFetching} headerHeight={headerHeight} />
        </div>
      </div>
    </>
  );
};
