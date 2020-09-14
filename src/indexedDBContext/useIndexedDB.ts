import { useState, useEffect, useCallback } from "react";
import { db, FavourtieTable } from "./typedDatabase";

export const useIndexedDB = () => {
  const [favourites, setFavourites] = useState<FavourtieTable[]>();

  const readAndUpdateState = () => {
    db.transaction("rw", db.favourites, async () => {
      setFavourites(await db.favourites.toArray());
    });
  };
  useEffect(() => {
    if (!db.isOpen()) {
      db.open().then(readAndUpdateState);
    } else {
      readAndUpdateState();
    }
    return () => db.close();
  }, [db]);

  const addToFavourites = async (data: FavourtieTable) => {
    const addedPK = await db.favourites.add(data);
    const addedFavourite = await db.favourites.get(addedPK);
    setFavourites((prev) => [...prev, addedFavourite]);
  };

  const deleteFavourite = async (id) => {
    await db.favourites.delete(id);
    setFavourites((prev) => prev.filter(({ key }) => key !== id));
  };

  const isInFavourites = useCallback(
    (key) => {
      return favourites.some((item) => item.key === key);
    },
    [favourites]
  );

  return {
    favourites,
    addToFavourites,
    deleteFavourite,
    isInFavourites,
  };
};
