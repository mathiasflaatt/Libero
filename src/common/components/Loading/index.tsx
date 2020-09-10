import React from "react";
import { and } from "src/SearchList/utils/css";
import style from "./loading.module.css";

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
      <span>{label}</span>
      <div className={style.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
