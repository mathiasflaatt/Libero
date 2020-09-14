import React from "react";
import { Loading, Error } from "src/SearchList/components";
import { useFetch } from "src/SearchList/utils/useFetch";
import { Author } from "../Author";
import { BookResponse } from "src/SearchList/typings/bookResponse";
import style from "./bookDetail.module.css";
import { FavouriteButton } from "../FavouriteButton";
import {
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  GridList,
  GridListTile,
} from "@material-ui/core";
import { AuthorResponse } from "src/SearchList/typings/authorReponse";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const BookDetail: React.FC<{ bibKey: string }> = React.memo(
  ({ bibKey }) => {
    const { data: book, loading, error } = useFetch<BookResponse>(
      `/api${bibKey}`
    );

    const {
      data: author,
      loading: authorLoading,
      error: authorError,
    } = useFetch<AuthorResponse>(
      !book ? null : `api${(book.authors[0] as any).author.key}`
    );

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    return book ? (
      <Grid component={Paper} container spacing={3}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10}>
            <h1>{book.title}</h1>
          </Grid>
          <Grid item xs={2}>
            {book && author && (
              <FavouriteButton target={{ ...book, author_name: author.name }} />
            )}
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" spacing={3}>
          <Grid item xs={3}>
            <Author
              author={author}
              loading={authorLoading}
              error={authorError}
              key={(book.authors[0] as any).author.key}
            />
          </Grid>
          <Grid item xs={9}>
            {book.description && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Description</Typography>
                </AccordionSummary>
                <Typography style={{ whiteSpace: "pre-wrap" }}>
                  {typeof book.description === "string"
                    ? book.description
                    : book.description.value}
                </Typography>
              </Accordion>
            )}
            {book.excerpts && (
              <Grid container direction="column">
                <Typography component="h2" variant="h4">
                  Excerpts
                </Typography>
                {book.excerpts.map((excerpt) => (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography component="p">{excerpt.comment}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component="p">{excerpt.excerpt}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>

        {book.covers?.length && (
          <Grid component={Paper} spacing={3}>
            <GridList spacing={1}>
              {book.covers.map((cover) => {
                return cover === -1 ? null : (
                  <GridListTile key={cover} rows={2} cols={1}>
                    <img
                      width={300}
                      height={300 * 1.2}
                      src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
                      alt={`Cover art of ${book.title}`}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          </Grid>
        )}
      </Grid>
    ) : null;
  }
);
