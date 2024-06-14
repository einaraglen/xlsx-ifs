import { Export, Filters } from "@electron/lib/methods";

export const classNames = (...classes: any): string => {
  return classes.filter(Boolean).join(" ");
};

export const getFilter = (data: Export | null, filters: Filters | null) => {
  if (!data || !filters) {
    return {};
  }

  const check: Record<string, number> = {};

  for (const [ifs_header, query] of Object.entries(filters)) {
    check[query] = data.keys.indexOf(ifs_header);
  }

  const filter: Record<number, boolean> = {};

  for (let i = 0; i < data.rows.length; i++) {
    for (const [query, index] of Object.entries(check)) {
      if (!data.rows[i][index]?.toString().startsWith(query)) {
        filter[i] = true;
      }
    }
  }

  return filter;
};

export const isArray = (val: any) => {
  return val != null && Array.isArray(val);
};

export const isObject = (val: any) => {
  return val != null && typeof val == "object" && !Array.isArray(val);
};

export const isString = (val: any) => {
  return val != null && typeof val === "string";
};
