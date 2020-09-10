import React from "react";

export const Error = ({ error }) => (
  <div>
    <h1>Error</h1>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
);
