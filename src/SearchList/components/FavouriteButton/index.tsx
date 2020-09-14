import React, { useCallback, useMemo, useState } from "react";
import { BookResponse } from "src/SearchList/typings/bookResponse";
import { Doc } from "src/SearchList/typings/searchResponse";
import { useIndexedDBContext } from "src/indexedDBContext";
import style from "./favourite.module.css";

export const FavouriteButton = ({ target }) => {
  const [] = useState();
  const {
    isInFavourites,
    addToFavourites,
    deleteFavourite,
  } = useIndexedDBContext();

  const isFavourite = isInFavourites(target.key);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      isFavourite
        ? deleteFavourite(target.key)
        : addToFavourites({
            key: target.key,
            title: target.title,
            author: target.author_name,
          });
    },
    [isFavourite, addToFavourites, deleteFavourite]
  );

  return (
    <button className={style.button} onClick={handleClick} tabIndex={1}>
      {isFavourite ? (
        <img
          className={style.image}
          src={require("public/icon/favourite-logo-active.svg")}
          alt="Active favourite icon"
        />
      ) : (
        <img
          className={style.image}
          src={require("public/icon/favourite-logo.svg")}
          alt="inactive favourite icon"
        />
      )}
    </button>
  );
};
