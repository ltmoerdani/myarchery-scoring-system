import * as React from "react";

// In-memory cache with TTL
const fetcherCache = new Map();
const DEFAULT_TTL = 1000 * 60 * 5; // 5 minutes

function getCache(key) {
  const entry = fetcherCache.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.timestamp > entry.ttl) {
    fetcherCache.delete(key);
    return undefined;
  }
  return entry.data;
}

function setCache(key, data, ttl = DEFAULT_TTL) {
  fetcherCache.set(key, { data, timestamp: Date.now(), ttl });
}

function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (let key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

function useFetcher(
  fetcherFunction,
  {
    shouldFetch,
    reducer = fetchingReducer,
    transform,
    cacheKey,
    cacheTTL = DEFAULT_TTL,
    debounce = 0,
    prefetch = false,
  } = {}
) {
  const [state, dispatch] = React.useReducer(reducer, {
    status: "idle",
    data: null,
    errors: null,
    attempts: 1,
  });
  const { attempts } = state;
  const debounceRef = React.useRef();
  const abortRef = React.useRef();

  React.useEffect(() => {
    const shouldPreventFetch = () => {
      if (typeof shouldFetch === "undefined") return false;
      return !shouldFetch;
    };
    if (shouldPreventFetch()) return;

    const key = typeof cacheKey === "string" ? cacheKey : fetcherFunction.toString();
    const cached = getCache(key);
    if (cached) {
      if (!shallowEqual(state.data, cached)) {
        dispatch({ status: "success", data: cached });
      }
      return;
    }

    if (debounce > 0) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(fetchData, debounce);
      return () => clearTimeout(debounceRef.current);
    } else {
      fetchData();
    }

    async function fetchData() {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      dispatch({ status: "loading", errors: null });
      try {
        const result = await fetcherFunction({ signal: abortRef.current.signal });
        if (result.success) {
          const makeData = (data) => (typeof transform === "function" ? transform(data) : data);
          const data = makeData(result.data);
          setCache(key, data, cacheTTL);
          dispatch({ status: "success", data });
        } else {
          dispatch({ status: "error", errors: result.errors || result.message });
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        dispatch({ status: "error", errors: err.message || err });
      }
    }
    // eslint-disable-next-line
  }, [attempts, fetcherFunction, cacheKey, shouldFetch, transform, cacheTTL, debounce]);

  React.useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // Optional prefetch
  React.useEffect(() => {
    if (!prefetch) return;
    const key = typeof cacheKey === "string" ? cacheKey : fetcherFunction.toString();
    if (!getCache(key)) {
      fetcherFunction().then((result) => {
        if (result.success) {
          const data = typeof transform === "function" ? transform(result.data) : result.data;
          setCache(key, data, cacheTTL);
        }
      });
    }
    // eslint-disable-next-line
  }, [prefetch, fetcherFunction, cacheKey, transform, cacheTTL]);

  const refetch = () => dispatch({ type: "REFETCH" });
  const reset = (preferedDefaultData) => dispatch({ type: "RESET", payload: preferedDefaultData });

  return { ...state, state, dispatch, refetch, reset };
}

function fetchingReducer(state, action) {
  if (action.type === "REFETCH") {
    return { ...state, attempts: state.attempts + 1 };
  }
  if (action.type === "RESET") {
    return {
      status: "idle",
      data: typeof action.payload !== "undefined" ? action.payload : null,
      errors: null,
      attempts: 1,
    };
  }
  return { ...state, ...action };
}

export { useFetcher, fetchingReducer };
