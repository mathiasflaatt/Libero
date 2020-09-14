import React, { useCallback, useState, useEffect } from "react";
import { List } from "./components/List";
import { BookDetail } from "../common/components/BookDetail";
import { useDebounce } from "./utils/useDebounce";
import style from "./index.module.css";
import { useFetch } from "./utils/useFetch";
import { Loading, Error } from "src/common/components";
import { SearchResponse, Doc } from "./typings/searchResponse";
import Grid from "@material-ui/core/Grid";
import { TextField, Paper, Container } from "@material-ui/core";

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

  if (error) return <Error error={error} />;
  return (
    <>
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
          {!loading ? (
            <>
              {data && (
                <List<Doc>
                  headers={[
                    { key: "title", name: "Title" },
                    { key: "author_name", name: "Author" },
                  ]}
                  list={data.docs}
                  onSetTarget={setTargetData}
                />
              )}
            </>
          ) : (
            <Loading className={style.loading} />
          )}
        </Grid>

        {targetData && (
          <Grid item xs={12} md={6} className={style.detail}>
            <BookDetail bibKey={targetData.key} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
