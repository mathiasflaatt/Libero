// import App from 'next/app'
import "styles/globals.css";

import { IndexedDBContextProvider } from "src/indexedDBContext";

function MyApp({ Component, pageProps }) {
  return (
    <IndexedDBContextProvider>
      <Component {...pageProps} />
    </IndexedDBContextProvider>
  );
}

export default MyApp;
