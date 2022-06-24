export const kebab = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

export const sleep = (n) => new Promise((r) => setTimeout(r, n));

export const wait = async (f) => {
  while (!(await f())) await sleep(1000);
  return f();
};

export const getUser = async ({ headers }) => {
  let { data, errors } = await api(headers)
    .post({ query: getCurrentUser })
    .json();

  if (errors) throw new Error(errors[0].message);
  return data.currentuser[0];
};

