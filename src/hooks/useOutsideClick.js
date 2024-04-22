import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      //pasing true value as a third argument to handle event in the capturing phase
      document.addEventListener("click", handleClick, listenCapturing);
      //removing the event listner by returning a callback function:
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
