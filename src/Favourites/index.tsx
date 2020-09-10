import React from "react";
import { useIndexdDBContext } from "src/indexedDBContext";

export const FavouriteList = () => {
  const { favourites, deleteFavourite } = useIndexdDBContext();

  return (
    <>
      {favourites?.map((data) => (
        <div>
          <h3>{data.title}</h3>
          <button
            onClick={() => {
              deleteFavourite(data.key);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  );
};
