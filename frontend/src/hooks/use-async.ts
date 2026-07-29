"use client";

import { useState, useCallback } from "react";
import { ApiError } from "@/lib/api/client";

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

type AsyncCallback<T, Args extends unknown[]> = (...args: Args) => Promise<T>;

/**
 * Wraps an async function with loading, error, and data state.
 * Normalises ApiError messages automatically.
 *
 * Usage:
 *   const { execute, isLoading, error, data } = useAsync(myApiCall);
 *   await execute(arg1, arg2);
 */
export function useAsync<T, Args extends unknown[]>(
  asyncFn: AsyncCallback<T, Args>
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const result = await asyncFn(...args);
        setState({ data: result, isLoading: false, error: null });
        return result;
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
            ? err.message
            : "An unexpected error occurred.";
        setState({ data: null, isLoading: false, error: message });
        return null;
      }
    },
    [asyncFn]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}
