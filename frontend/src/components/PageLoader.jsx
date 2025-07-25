import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import React from "react";

const PageLoader = () => {
  const { theme } = useThemeStore(); // Gets current theme from the store

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      data-theme={theme}
    >
      <LoaderIcon
        className="text-primary"
        style={{
          width: "2.5rem",
          height: "2.5rem",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};

export default PageLoader;
