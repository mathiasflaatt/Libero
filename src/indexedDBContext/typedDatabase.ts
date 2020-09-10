import Dexie from "dexie";
import { BookResponse } from "src/SearchList/typings/bookResponse";

class TypedDatabase extends Dexie {
  favourites: Dexie.Table<BookResponse, string>;

  constructor() {
    super("LiberoDatabase");

    this.version(1).stores({
      favourites: "&key",
    });

    this.favourites = this.table("favourites");
  }
}

export const db = new TypedDatabase();
