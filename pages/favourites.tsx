import Head from "next/head";
import { FavouriteList } from "src/SearchList/components/Favourites";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Libero</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FavouriteList onSetTarget={console.log} />
    </div>
  );
}
