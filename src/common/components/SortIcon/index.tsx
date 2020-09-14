import React from "react";

export const SortIcon = ({ asc }) => {
  return (
    <img
      src={require(asc
        ? "src/common/components/SortIcon/images/iconmonstr-angel-up-thin.svg"
        : "src/common/components/SortIcon/images/iconmonstr-angel-down-thin.svg")}
      alt={`Sorticon ${asc ? "acending" : "decending"}`}
    />
  );
};
