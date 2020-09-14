import React, {
  useState,
  useMemo,
  useCallback,
  PropsWithChildren,
} from "react";
import style from "./list.module.css";
import { FavouriteButton } from "../FavouriteButton";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";

type List<T> = {
  headers: { key: keyof T; name: string }[];
  defaultSortedHeader?: keyof T;
  list: T[];
  onSetTarget: (target: T) => void;
  listName?: string;
};

export function List<T>({
  list,
  onSetTarget,
  headers,
  defaultSortedHeader = headers[0].key,
  listName,
}: PropsWithChildren<List<T>>) {
  const [sortTarget, setSortTarget] = useState<{
    key: keyof T;
    asc: boolean;
  }>({ key: defaultSortedHeader, asc: false });

  const sortedlist = useMemo(() => {
    return (list?.length && Array.isArray(list[0][sortTarget.key])
      ? [...list].map((item) => ({
          ...item,
          [sortTarget.key]: item[sortTarget.key][0],
        }))
      : [...(list ?? [])]
    ).sort((a, b) => {
      return sortTarget.asc
        ? b[sortTarget.key]
            .toString()
            .localeCompare(a[sortTarget.key].toString())
        : a[sortTarget.key]
            .toString()
            .localeCompare(b[sortTarget.key].toString());
    });
  }, [sortTarget, list]);

  const toggleSort = useCallback(
    (key: keyof T) => (
      event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
    ) => {
      setSortTarget({
        key,
        asc: sortTarget.key === key ? !sortTarget.asc : true,
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
    <TableContainer onKeyDown={onNavigate} className={style.table}>
      <Table aria-label={listName}>
        <TableHead>
          <TableRow>
            {headers.map((header) => {
              return (
                <TableCell
                  scope="col"
                  key={header.key.toString()}
                  sortDirection={
                    sortTarget.key === header.key
                      ? sortTarget.asc
                        ? "asc"
                        : "desc"
                      : false
                  }
                >
                  <TableSortLabel
                    active={sortTarget.key === header.key}
                    direction={sortTarget.asc ? "asc" : "desc"}
                    onClick={toggleSort(header.key)}
                  >
                    {header.name}
                    {sortTarget.key === header.key && (
                      <span className={style.visuallyHidden}>
                        {sortTarget.asc
                          ? "sorted ascending"
                          : "sorted descending"}
                      </span>
                    )}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <tbody className={style.table__body}>
          {sortedlist.map((item, i) => (
            <TableRow
              hover
              onClick={(e) => onSetTarget(item)}
              key={item[headers[0].key].toString()}
              tabIndex={1}
            >
              {headers.map((header, i) => (
                <TableCell
                  {...(i === 1 ? { scope: "row" } : {})}
                  key={header.name}
                >
                  {item[header.key]?.toString()}
                </TableCell>
              ))}
              <TableCell>
                <FavouriteButton target={item} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
