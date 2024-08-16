import React from "react";

function usebeforeUnload(beforeUnLoadFn) {
  React.useEffect(() => {
    window.addEventListener("beforeunload", beforeUnLoadFn);
    return () => {
      window.removeEventListener("beforeunload", beforeUnLoadFn);
    };
  }, []);
}

export default usebeforeUnload;
