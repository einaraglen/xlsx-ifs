import xlsx from 'node-xlsx';

export const readClipboard = (clipboard: string) => {
    const data_regex = /-\$[0-9]+:/;
    const code_regex = /[\(\)]/;
    const lines = clipboard.split("\n")

    let items: any[] = [];
    let current: any = { field: [], code: [] };

    if (lines[0] != "!IFS.COPYOBJECT") {
      throw new Error("Clipboard format not supported")
    }

    for (const line of lines) {
      if (line.trim() == "-") {
        items.push(current)
        current = { field: [], code: [] };
      } else if (data_regex.test(line)) {
        const [cursor, content] = line.split(":");
        const index = Number(cursor.replace("-$", ""))
        const code = code_regex.test(content)

        const segments = content.split("=")
        let formatted: any | null = null;

        if (!code && segments.length < 2) {
            formatted = ["UNKNOWN", null]
        } else {
            formatted = [segments[0], segments[1]]
        }

        current[code ? "code" : "field"].push({ index , content: formatted || content })
      }
    }

    return items;
}

export const readFile = (path: string) => {
    const [res] = xlsx.parse(path);

    let max = { index: -1, length: 0};

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].length > max.length) {
        max = { index: i, length: res.data[i].length}
      }
    }

    const truncated = res.data.slice(max.index)

    // Might not even use this if users want to import from other excel files!
    // if (!truncated[0].includes("Part Number")) {
    //   throw new Error("Missing header 'Part Number'")
    // }

    return truncated
}

export const exportData = ({ structure, parts, selected }: any) => {
  const defaults = structure[0].field.map((key: any) => key.content[1]);
  const keys = structure[0].field.map((key: any) => key.content[0]);
    const headers = parts[0];

    const changes = Object.entries(selected).map(([key, value]) => ({ struct_index: keys.indexOf(key), header_index: headers.indexOf(value) }))

    const rows = [];

    for (let i = 1; i < parts.length; i++) {
      let data: any[] = new Array(keys.length).fill(null);

      for (let j = 0; j < changes.length; j++) {
        data[changes[j].struct_index] = changes[j].header_index == -1 ? defaults[changes[j].struct_index] : parts[i][changes[j].header_index]
      }

      rows.push(data)
    }

    return { keys, rows};
}