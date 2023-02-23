import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/rootReducer";
import { AppDispatch } from "../../store/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

//from toolkit docs
export const useAppDispatch = () => useDispatch<AppDispatch>();

// on window resize listener
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const useDidUpdateEffect = (fn: any, inputs: any) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};
