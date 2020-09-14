import React from "react";
import { useIndexdDBContext } from "src/indexedDBContext";
import { List } from "src/SearchList/components/List";
import { FavourtieTable } from "src/indexedDBContext/typedDatabase";
import { Paper, Typography } from "@material-ui/core";

export const FavouriteList = ({ onSetTarget }) => {
  const { favourites, deleteFavourite } = useIndexdDBContext();

  return (
    <Paper style={{ margin: "2rem" }} variant="elevation">
      <Typography>My </Typography>
      <List<FavourtieTable>
        list={favourites}
        headers={[
          { key: "title", name: "Title" },
          { key: "author", name: "Author" },
        ]}
        onSetTarget={onSetTarget}
      />
    </Paper>
  );
};
