import React from "react";
import { useFetch } from "src/SearchList/utils/useFetch";
import { Loading, Error } from "src/common/components";
import { AuthorResponse } from "src/SearchList/typings/authorReponse";

export const Author = ({ authorKey }) => {
  const { data: author, error, loading } = useFetch<AuthorResponse>(
    `api${authorKey}`
  );

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return author ? (
    <>
      {author.type && <h2>{author.type.key.split("/").slice(-1)}</h2>}
      {author.photos && (
        <img
          width={180}
          height={226}
          src={`https://covers.openlibrary.org/a/id/${author.photos[0]}-M.jpg`}
          alt={`Image of ${author.personal_name}`}
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
    </>
  ) : null;
};
