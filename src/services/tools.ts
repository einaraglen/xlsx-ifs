export const classNames = (...classes: any): string => {
  return classes.filter(Boolean).join(" ");
};

export const getFilter = (filters: Record<string, { filter: string; indexes: number[] }>) => {
  let values: number[] = [];

  for (const item of Object.entries(filters)) {
    values = [...values, ...item[1].indexes];
  }

  const unique = new Set(values);

  return [...unique].reduce<any>((res: any, curr: number) => {
    res[curr] = true;
    return res;
  }, {});
};
