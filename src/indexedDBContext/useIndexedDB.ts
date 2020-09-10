import { useState, useEffect } from "react";
import { db } from "./typedDatabase";
import { BookResponse } from "src/SearchList/typings/bookResponse";

export const useIndexedDB = () => {
  const [favourites, setFavourites] = useState<BookResponse[]>();

  useEffect(() => {
    db.transaction("rw", db.favourites, async () => {
      setFavourites(await db.favourites.toArray());
    });
    return () => db.close();
  }, [db]);

  const addToFavourites = async (data: BookResponse) => {
    console.log(
      {
        key: data.key,
        title: data.title,
      },
      data.key
    );
    const addedPK = await db.favourites.add(data);
    const addedFavourite = await db.favourites.get(addedPK);
    setFavourites((prev) => [...prev, addedFavourite]);
  };

  const deleteFavourite = async (id) => {
    await db.favourites.delete(id);
    setFavourites((prev) => prev.filter(({ key }) => key !== id));
  };

  return {
    favourites,
    addToFavourites,
    deleteFavourite,
  };
};
