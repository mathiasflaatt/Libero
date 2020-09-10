// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

const headers = new Headers([
  ["Accept", "application/json"],
  ["Content-type", "application/json"],
]);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { path, ...query },
    method,
  } = req;
  const url = `http://openlibrary.org/${path.join("/")}${
    query
      ? `?${Object.entries(query)
          .map(
            ([key, val]: [string, string]) =>
              `${key}=${encodeURIComponent(val)}`
          )
          .join("&")}`
      : ""
  }`;
  const response = await fetch(url, { method, headers });
  if (response.ok) {
    res.json(await response.json());
  } else {
    res.statusCode = 400;
    res.send(await response.json());
    res.end();
  }
}
