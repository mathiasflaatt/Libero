import { useMemo, useCallback } from "react";
import { useAsync, AsyncReturnType } from "./useAsync";

export function useFetch<T>(url: RequestInfo, optionsOverride?: RequestInit) {
  const defaultOptions: RequestInit = {
    method: "GET",
  };

  const options = useMemo(() => {
    // TODO fix for nested values
    return { ...defaultOptions, ...optionsOverride };
  }, [optionsOverride]);

  return useAsync<T>(async () => {
    if (!url) return null;
    const respose = await fetch(url, options);
    return await respose.json();
  }, [url, options]);
}
