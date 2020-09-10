import React, { useCallback, useState, useEffect } from "react";
import { List } from "./components/List";
import { BookDetail } from "./components/BookDetail";
import { useDebounce } from "./utils/useDebounce";
import style from "./index.module.css";
import { useFetch } from "./utils/useFetch";
import { Loading, Error } from "src/common/components";
import { SearchResponse, Doc } from "./typings/searchResponse";

type SearchList = {
  searchQuery: string;
};

export const SearchList = () => {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchQuery = useDebounce(searchString, 500);
  const [targetData, setTargetData] = useState<Doc>();
  const { loading, error, data } = useFetch<SearchResponse>(
    debouncedSearchQuery
      ? `/api/search?author=${debouncedSearchQuery}&limit=20`
      : null
  );

  useEffect(() => {
    setTargetData(null);
  }, [data]);

  // const [{ loading, error, data }, set] = useState<{
  //   loading: boolean;
  //   data?: SearchPayload;
  //   error?: string;
  // }>({ loading: false });

  // const fetchAction = useCallback(async () => {
  //   if (!debouncedSearchQuery) return null;

  //   // Abort early if no query
  //   const response = await fetch(
  //     `/api/search?author=${debouncedSearchQuery}&limit=20`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   if (response.ok) {
  //     return await response.json();
  //   }
  //   throw new Error(await response.json());
  // }, [debouncedSearchQuery]);

  // useEffect(() => {
  //   let mounted = true;

  //   set({ loading: true, data: null, error: null });
  //   setTargetData(null);
  //   fetchAction()
  //     .then((data) => {
  //       if (mounted) {
  //         set({
  //           loading: false,
  //           data,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       if (mounted) {
  //         set({ loading: false, error });
  //       }
  //     });

  //   return () => {
  //     mounted = false;
  //   };
  // }, [fetchAction]);

  if (error) return <Error error={error} />;
  return (
    <>
      <input
        tabIndex={1}
        className={style.search}
        type="text"
        onChange={(e) => setSearchString(e.currentTarget.value)}
        placeholder="Søk etter forfattere og deres verk"
      />
      <div className={style.searchListWrapper}>
        {!loading ? (
          <>
            {data && (
              <div className={style.list}>
                <List docs={data.docs} onSetTarget={setTargetData} />
              </div>
            )}

            {targetData && (
              <div className={style.detail}>
                <BookDetail bibKey={targetData.key} />
              </div>
            )}
          </>
        ) : (
          <Loading className={style.loading} />
        )}
      </div>
    </>
  );
};
