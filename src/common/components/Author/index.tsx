import React from "react";
import { useFetch } from "src/SearchList/utils/useFetch";
import { Loading, Error } from "src/common/components";
import { AuthorResponse } from "src/SearchList/typings/authorReponse";
import { Card, CardMedia } from "@material-ui/core";
import style from "./author.module.css";

export const Author = ({ author, error, loading }) => {
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return author ? (
    <Card variant="elevation">
      {author.photos && (
        <CardMedia
          className={style.image}
          image={`https://covers.openlibrary.org/a/id/${author.photos[0]}-M.jpg`}
          title={`Image of ${author.personal_name}`}
        />
      )}
      <h1>{author.name}</h1>
      {author.birth_date && <span>Born: {author.birth_date}</span>}
      {author.bio && (
        <p>{typeof author.bio === "string" ? author.bio : author.bio.value}</p>
      )}
      <ul>
        {author.links?.map((link) => {
          if (link.type.key === "/type/link") {
            return (
              <li>
                <a href={link.url} target="_blank" rel="noreferrer noopener">
                  {link.title}
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </Card>
  ) : null;
};
