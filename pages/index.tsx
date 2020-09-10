import Head from "next/head";
import { SearchList } from "src/SearchList";
import { FavouriteList } from "src/Favourites";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Libero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchList />
      <FavouriteList></FavouriteList>
    </div>
  );
}
