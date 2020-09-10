import { useState, useCallback, useEffect } from "react";

export type AsyncReturnType<T> = { data?: T; error?: string; loading: boolean };

export function useAsync<T>(fn, args): AsyncReturnType<T> {
  const [state, set] = useState<AsyncReturnType<T>>({
    data: null,
    error: null,
    loading: false,
  });
  const memoized = useCallback(fn, args);

  useEffect(() => {
    let mounted = true;
    const promise = memoized();
    set({ loading: true, data: null, error: null });
    promise.then(
      (data: T) => {
        if (mounted) {
          set({
            loading: false,
            data,
          });
        }
      },
      (error: Error) => {
        if (mounted) {
          set({
            loading: false,
            error: error.message,
          });
        }
      }
    );

    return () => {
      mounted = false;
    };
  }, [memoized]);

  return state;
}
