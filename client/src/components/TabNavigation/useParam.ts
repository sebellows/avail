import { useEffect, useState } from 'react';

export function getQueryParam(name: string, defaultValue: string) {
  const params = new URLSearchParams(window.location.search);
  return params[name] || defaultValue;
}

export function updateQueryParam(name: string, value: string) {
  const params = new URLSearchParams(window.location.search);
  params[name] = value;
  const paramsString = params.toString();
  const url = `${window.location.pathname}?${paramsString}`;

  window.history.pushState(null, null, url);
}

export function useParam(paramName, initialValue) {
  const [param, setParam] = useState(() => getQueryParam(paramName, initialValue));

  const updateParam = (paramValue) => {
    setParam(paramValue);
    updateQueryParam(paramName, paramValue);
  };

  useEffect(() => {
    const handlePopState = () => {
      const paramValue = getQueryParam(paramName, initialValue);
      setParam(paramValue);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [paramName, initialValue]);

  return [param, updateParam];
}
