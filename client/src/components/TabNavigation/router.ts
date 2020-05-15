export function to(path: string, queries?: Record<string, string>) {
  const params = new URLSearchParams(window.location.search);
  if (queries) {
    Object.entries(queries).forEach(([k, v]) => {
      params.set(k, v);
    });
  }
  const paramsString = params.toString().length ? '?' + params.toString() : '';
  const url = `/${path}${paramsString}`;

  window.history.pushState(null, null, url);
}
