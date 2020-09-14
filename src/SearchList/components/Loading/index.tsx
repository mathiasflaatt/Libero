import React from "react";
import { and } from "src/SearchList/utils/css";
import style from "./loading.module.css";
import { CircularProgress } from "@material-ui/core";

type Loading = {
  label?: string;
} & JSX.IntrinsicElements["div"];

export const Loading: React.FC<Loading> = ({
  label = "Loading",
  className = "",
  ...rest
}) => {
  return (
    <div className={and(className, style.loading)} {...rest}>
      <CircularProgress disableShrink />
    </div>
  );
};
