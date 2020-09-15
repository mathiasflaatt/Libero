import { Button, Paper, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { default as React, useCallback, useEffect, useState } from "react";
import { Error, Loading } from "src/SearchList/components";
import { BookDetail } from "./components/BookDetail";
import { List } from "./components/List";
import style from "./index.module.css";
import { Doc, SearchResponse } from "./typings/searchResponse";
import { AsyncReturnType } from "./utils/useAsync";
import { useDebounce } from "./utils/useDebounce";

type SearchList = {
  searchQuery: string;
};

export const SearchList = () => {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchQuery = useDebounce<string>(searchString, 500);
  const [targetData, setTargetData] = useState<Doc>();
  const { loading, error, data, nextPage } = usePaginatedSearch<
    SearchResponse,
    Doc
  >(debouncedSearchQuery, (result) => result.docs);

  if (error) return <Error error={error} />;

  return (
    <Grid
      className={style.container}
      container
      spacing={3}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid component={Paper} item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          tabIndex={1}
          type="text"
          onChange={(e) => setSearchString(e.currentTarget.value)}
          placeholder="Søk etter forfattere og deres verk"
        />
        {data && (
          <List<Doc>
            headers={[
              { key: "title", name: "Title" },
              { key: "author_name", name: "Author" },
            ]}
            list={data}
            onSetTarget={setTargetData}
          />
        )}
        {loading && <Loading className={style.loading} />}
        {data && <Button onClick={nextPage}>Last flere</Button>}
      </Grid>

      {targetData && (
        <Grid item xs={12} md={6} className={style.detail}>
          <BookDetail bibKey={targetData.key} />
        </Grid>
      )}
    </Grid>
  );
};

type PaginatedSearch<T> = AsyncReturnType<T> & {
  nextPage(): void;
};
function usePaginatedSearch<T, U>(
  search: string,
  transform: (val: T) => U[]
): PaginatedSearch<U[]> {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<U[] | null>(null);

  const url = search
    ? `/api/search?author=${search}&limit=20&page=${page}`
    : null;

  useEffect(() => setPage(1), [search]);
  useEffect(() => {
    const getData = async () => {
      if (!url) {
        return setData(null);
      }

      setLoading(true);
      try {
        const respose = await fetch(url);
        const newData = await respose.json();
        setData((data ?? []).concat(transform(newData)));
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  return {
    error,
    loading,
    data,
    nextPage: useCallback(() => setPage(page + 1), [page]),
  };
}
