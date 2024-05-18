import { Spinner } from "flowbite-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-dvh bg-gray-200 dark:bg-gray-900 ">
      {" "}
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
  );
};

export default LoadingPage;
