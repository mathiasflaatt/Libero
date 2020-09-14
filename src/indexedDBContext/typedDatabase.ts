import Dexie from "dexie";

export type FavourtieTable = {
  key: string;
  title: string;
  author: string | string[];
};
class TypedDatabase extends Dexie {
  favourites: Dexie.Table<FavourtieTable, string>;

  constructor() {
    super("LiberoDatabase");

    this.version(1).stores({
      favourites: "&key",
    });

    this.favourites = this.table("favourites");
  }
}

export const db = new TypedDatabase();
