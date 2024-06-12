import xlsx from "node-xlsx";

export type IFS_Structure = { index: number; header: string; value: string };

export const readClipboard = (clipboard: string) => {
  const data_regex = /-\$[0-9]+:/;
  const code_regex = /[\(\)]/;
  const lines = clipboard.split("\n");

  let items: any[] = [];
  let current: IFS_Structure[] = [];

  if (lines[0] != "!IFS.COPYOBJECT") {
    throw new Error("Clipboard format not supported");
  }

  const metadata = lines.splice(0, 3);

  for (const line of lines) {
    if (line.trim() == "-") {
      items.push(current);
      current = [];
    } else if (data_regex.test(line)) {
      const [cursor, content] = line.split(":");
      const index = Number(cursor.replace("-$", ""));
      const code = code_regex.test(content);

      if (code) {
        continue;
      }

      const segments: string[] = content.split("=");

      if (segments.length != 2 || segments[0].trim() == "") {
        continue;
      }

      current.push({ index, header: segments[0], value: segments[1] });
    }
  }

  return { metadata, structure: items[0] };
};

export const readFile = (path: string) => {
  const [res] = xlsx.parse(path);

  let max = { index: -1, length: 0 };

  for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].length > max.length) {
      max = { index: i, length: res.data[i].length };
    }
  }

  const truncated = res.data.slice(max.index);

  return truncated;
};

export type ExportArguments = {
  structure: IFS_Structure[];
  parts: (string | number | null)[][];
  selected: Record<string, string>;
};

export const exportData = ({ structure, parts, selected }: ExportArguments) => {
  const defaults = structure.map((item) => item.value);
  const keys = structure.map((item) => item.header);
  const headers = parts[0];

  const changes = Object.entries(selected).map(([key, value]) => ({ struct_index: keys.indexOf(key), header_index: headers.indexOf(value) }));

  const rows: (string | number | null)[][] = [];

  for (let i = 1; i < parts.length; i++) {
    let data: any[] = new Array(keys.length).fill(null);

    for (let j = 0; j < changes.length; j++) {
      data[changes[j].struct_index] = changes[j].header_index == -1 ? defaults[changes[j].struct_index] : parts[i][changes[j].header_index];
    }

    rows.push(data);
  }

  return { keys, rows };
};

export type PrepareArguments = {
  structure: IFS_Structure[];
  metadata: string[];
  filter: Record<number, boolean>;
  data: { keys: string[]; rows: (string | number | null)[][] };
};

export const prepareClipboard = ({ structure, metadata, filter, data }: PrepareArguments) => {
  const lookup = structure.reduce<Record<string, number>>((res, curr) => {
    res[curr.header] = curr.index;
    return res;
  }, {});

  const { keys, rows } = data;

  let formatted: any[] = [];

  for (let i = 0; i < rows.length; i++) {
    if (filter[i]) {
      continue;
    }

    let current: any = [];

    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] == null) {
        continue;
      }

      current.push({ index: lookup[keys[j]], header: keys[j], value: rows[i][j] });
    }

    formatted.push(current);
  }

  return getIFSClipboardStructure([...metadata, ...formatted]);
};

const getIFSClipboardStructure = (lines: any[]) => {
  let payload = ``;

  for (const row of lines) {
    if (Array.isArray(row)) {
      payload += `$RECORD=!\n`;
      for (const col of row) {
        payload += `-$${col.index}:${col.header}=${col.value}\n`;
      }
      payload += `-\n`;
    } else {
      payload += `${row}\n`;
    }
  }

  return payload;
};
