import xlsx from "node-xlsx";

export type Structure = { index: number; header: string; value: string };
export type Row = (string | number | null)[];
export type Metadata = string[];
export type Filters = Record<string, string>;
export type Filter = Record<number, boolean>;
export type Selected = Record<string, string>;
export type Export = { keys: string[]; rows: Row[] };
export type Header = { index: number; header: string };

export type ExportArguments = {
  structure: Structure[];
  parts: Row[];
  selected: Selected;
  groupBy: string | null;
};

export type PrepareArguments = {
  structure: Structure[];
  metadata: Metadata;
  filter: Filter;
  data: { keys: string[]; rows: Row[] };
};

type PreparedLine = { index: number; header: string; value: string | number | null };

const data_regex = /-\$[0-9]+:/;
const code_regex = /[\(\)]/;
const new_line = "\n";

const line = (str: string) => `${str}\n`;

export const readClipboard = (clipboard: string) => {
  const lines = clipboard.split(new_line);

  let items: Structure[][] = [];
  let cursor: Structure[] = [];

  const [index] = lines;

  if (index != "!IFS.COPYOBJECT") {
    throw new Error("Clipboard format not supported");
  }

  const metadata = lines.splice(0, 3);

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() == "-") {
      items.push(cursor);
      cursor = [];

      continue;
    }

    if (data_regex.test(lines[i])) {
      const [raw_index, content] = lines[i].split(":");
      const index = Number(raw_index.replace("-$", ""));
      const code = code_regex.test(content);

      if (code) {
        continue;
      }

      const [header, value] = content.split("=");

      if (!header || !value || !header) {
        continue;
      }

      cursor.push({ index, header, value });
    }
  }

  const [structure] = items;

  return { metadata, structure };
};

export const readFile = (path: string) => {
  const [res] = xlsx.parse(path);

  if (!res) {
    throw new Error("No data found in file");
  }

  let max = { index: -1, length: 0 };

  for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].length > max.length) {
      max = { index: i, length: res.data[i].length };
    }
  }

  const truncated = res.data.slice(max.index);

  if (truncated.length == 0) {
    throw new Error("No data found in file");
  }

  return truncated as Row[];
};

export const exportData = ({ structure, parts, selected, groupBy }: ExportArguments) => {
  const defaults = structure.map((item) => item.value);
  const keys = structure.map((item) => item.header);
  const headers = parts[0];

  const connections = [];

  for (let i = 0; i < Object.entries(selected).length; i++) {
    const [key, value] = Object.entries(selected)[i];
    connections.push({ struct_index: keys.indexOf(key), header_index: headers.indexOf(value) });
  }

  let rows: Row[] = [];

  for (let i = 1; i < parts.length; i++) {
    let data: any[] = new Array(keys.length).fill(null);

    for (let j = 0; j < connections.length; j++) {
      const { struct_index, header_index } = connections[j];
      const payload = header_index == -1 ? defaults[struct_index] : parts[i][header_index];
      data[struct_index] = payload;
    }

    rows.push(data);
  }

  if (!groupBy) {
    return { keys, rows: sortRows(rows) };
  }

  const group_index = keys.indexOf(groupBy);
  const merged_by_group: Record<string, Row> = {};

  for (let i = 0; i < rows.length; i++) {
    const common_key = rows[i][group_index] as string;

    if (!merged_by_group[common_key]) {
      merged_by_group[common_key] = rows[i];
      continue;
    }

    for (let j = 0; j < rows[i].length; j++) {
      if (!rows[i][j] || typeof rows[i][j] != "number") {
        continue;
      }

      (merged_by_group[common_key][j] as number) += rows[i][j] as number;
    }
  }

  rows = Object.entries(merged_by_group).map((item) => item[1])

  return { keys, rows: sortRows(rows) };
};

const sortRows = (rows: Row[]) => {
  return [...rows].sort((a, b) => a.join("").localeCompare(b.join("")))
}

export const prepareClipboard = ({ structure, metadata, filter, data }: PrepareArguments) => {
  const connections: Record<string, number> = {};

  for (let i = 0; i < structure.length; i++) {
    connections[structure[i].header] = structure[i].index;
  }

  const { keys, rows } = data;

  let formatted: PreparedLine[][] = [];

  for (let i = 0; i < rows.length; i++) {
    if (filter[i]) {
      continue;
    }

    let current: PreparedLine[] = [];

    for (let j = 0; j < rows[i].length; j++) {
      if (!rows[i][j]) {
        continue;
      }

      current.push({ index: connections[keys[j]], header: keys[j], value: rows[i][j] });
    }

    formatted.push(current);
  }

  let str = ``;
  const lines = [...metadata, ...formatted];

  for (let i = 0; i < lines.length; i++) {
    if (typeof lines[i] == "string") {
      str += line(lines[i] as string);
      continue;
    }

    str += line("$RECORD=!");

    for (let j = 0; j < lines[i].length; j++) {
      const data = lines[i][j] as PreparedLine;
      str += line(`-$${data.index}:${data.header}=${data.value}`);
    }

    str += line("-");
  }

  return str;
};
