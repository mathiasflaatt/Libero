// import App from 'next/app'

import { IndexedDBContextProvider } from "src/indexedDBContext";

function MyApp({ Component, pageProps }) {
  return (
    <IndexedDBContextProvider>
      <Component {...pageProps} />
    </IndexedDBContextProvider>
  );
}

export default MyApp;
