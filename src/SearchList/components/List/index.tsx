import React, { useState, useMemo, useCallback, useRef } from "react";
import { Doc } from "src/SearchList/typings/searchResponse";
import style from "./list.module.css";

type List = {
  docs: Doc[];
  onSetTarget: (target: Doc) => void;
};

export const List: React.FC<List> = ({ docs, onSetTarget }) => {
  const [sortTarget, setSortTarget] = useState<{
    key: keyof Extract<Doc, string>;
    asc: boolean;
  }>({ key: "title", asc: true });

  const sortedDocs = useMemo(() => {
    return [...docs]
      .map((doc) => ({ ...doc, author_name: doc.author_name[0] }))
      .sort((a, b) => {
        return sortTarget.asc
          ? a[sortTarget.key].localeCompare(b[sortTarget.key])
          : b[sortTarget.key].localeCompare(b[sortTarget.key]);
      });
  }, [sortTarget, docs]);

  const shuffle = useCallback(
    (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
      setSortTarget({
        key: event.currentTarget.dataset.target,
        asc:
          sortTarget.key === event.currentTarget.dataset.target
            ? !sortTarget.asc
            : true,
      });
    },
    [sortTarget, setSortTarget]
  );

  const onNavigate = (e) => {
    if (e.keyCode === 13) {
      (document.activeElement as HTMLElement).click();
    }
  };

  return (
    <table onKeyDown={onNavigate}>
      <caption>Search results</caption>
      <thead>
        <tr>
          <th scope="col" onClick={shuffle} data-target="title" tabIndex={1}>
            Booktitle
          </th>
          <th
            scope="col"
            onClick={shuffle}
            data-target="author_name"
            tabIndex={1}
          >
            Author
          </th>
        </tr>
      </thead>
      <tbody className={style.list}>
        {sortedDocs.map((doc, i) => (
          <tr onClick={(e) => onSetTarget(doc)} key={doc.key} tabIndex={2}>
            <th scope="row">{doc.title}</th>
            <td>{doc.author_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
