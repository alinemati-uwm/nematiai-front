"use client";

import React from "react";

import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { TOAST_DEFAULT_CLOSE_DURATION } from "../constants/toast";

interface ReactToastifyProviderProps {
  children: React.ReactNode;
}

const ReactToastifyProvider: React.FC<ReactToastifyProviderProps> = props => {
  const { children } = props;
  return (
    <React.Fragment>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={TOAST_DEFAULT_CLOSE_DURATION}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        toastClassName="!w-[100vw] sm:!w-[unset] !rounded"
      />
    </React.Fragment>
  );
};

export default ReactToastifyProvider;
