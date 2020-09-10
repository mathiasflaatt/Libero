import React from "react";
import { Loading, Error } from "src/common/components";
import { useFetch } from "src/SearchList/utils/useFetch";
import { Author } from "../Author";
import { BookResponse } from "src/SearchList/typings/bookResponse";
import style from "./bookDetail.module.css";
import { useIndexdDBContext } from "src/indexedDBContext";

export const BookDetail: React.FC<{ bibKey: string }> = React.memo(
  ({ bibKey }) => {
    const { addToFavourites } = useIndexdDBContext();
    const { data: book, loading, error } = useFetch<BookResponse>(
      `/api${bibKey}`
    );

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    return book ? (
      <div tabIndex={1}>
        <button
          onClick={() => {
            addToFavourites(book);
          }}
        >
          Add to favourites
        </button>
        <h1>{book.title}</h1>
        {book.description && (
          <p style={{ whiteSpace: "pre-wrap" }}>
            {typeof book.description === "string"
              ? book.description
              : book.description.value}
          </p>
        )}
        {book.excerpts && (
          <div>
            excerpts:{" "}
            {book.excerpts.map((excerpt) => (
              <>
                <p>{excerpt.excerpt}</p>
                <p>{excerpt.comment}</p>
              </>
            ))}
          </div>
        )}
        <div>
          {book.authors?.map((item) => {
            const author = item["author"] ?? item;
            return <Author authorKey={author.key} key={author.key} />;
          })}
        </div>
        {book.covers?.length && (
          <div className={style.imageWrapper}>
            {book.covers.map((cover) =>
              cover === -1 ? null : (
                <img
                  width={300}
                  height={300 * 1.2}
                  src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
                  alt={`Cover art of ${book.title}`}
                />
              )
            )}
          </div>
        )}
      </div>
    ) : null;
  }
);
