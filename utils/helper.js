import useSWR from 'swr';

export function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const fetcher = (arg, ...args) =>
  fetch(arg, ...args).then((res) => res.json());

export function swrFetch(id) {
  const fetcher = (arg, ...args) =>
    fetch(arg, ...args).then((res) => res.json());

  const { data, error } = useSWR(id, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
