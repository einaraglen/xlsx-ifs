import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Button from "../components/widgets/Button";
import { useEffect, useState, memo, useMemo } from "react";
import { useAppContext } from "../services/context";
import useInvoke from "../services/invoke";
import { FixedSizeGrid as Grid } from "react-window";
import Overlay from "../components/layout/Overlay";
import { classNames } from "../services/tools";

const Export = () => {
  const { structure, parts, selected, filters } = useAppContext();
  const { exportData } = useInvoke();
  const [data, setData] = useState({ keys: [], rows: [] });
  const [header, setHeader] = useState<{ index: number, header: string } | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const filter = useMemo(() => {
    let values: number[] = [];

    for (const [key, value] of Object.entries(filters)) {
      values = [...values, ...value.indexes]
    }

    const unique = new Set(values)

    return [...unique].reduce<any>((res: any, curr: number) => {
      res[curr] = true;
      return res;
    }, {});
  }, [filters])

  useEffect(() => {
    if (!structure || !parts || !selected) {
      return;
    }

    const fetch = async () => {
      const res = await exportData(structure, parts, selected);
      setData(res);
    };

    fetch();
  }, [structure, parts, selected]);

  const onHeaderSelection = (index: number, header: string) => {
    setOpen(true)
    setHeader({ index, header, })
  }

  const Cell = memo(({ columnIndex, rowIndex, style }: any) =>
    rowIndex == 0 ? (
      <button onClick={() => onHeaderSelection(columnIndex, data.keys[columnIndex] || "BLANK")} className={classNames(filters[data.keys[columnIndex] || "BLANK"] != null ? "bg-violet-900": "bg-zinc-900", " text-left hover:bg-violet-600 transition-colors duration-100 flex space-x-1 items-center pl-2 font-medium shadow-md border-b border-r border-white/10")} style={style}>
        <div className="w-[95%] truncate">
          {data.keys[columnIndex] || "BLANK"}
          </div>
      </button>
    ) : (
      <div className={classNames(filter[rowIndex] && "bg-rose-400/10", "flex items-center pl-2 border-b border-r border-white/10 relative")} style={style}>
        <div className={classNames(filter[rowIndex] && "opacity-50", "w-[95%] truncate")}>
          {data.rows[rowIndex][columnIndex] ? <span>{data.rows[rowIndex][columnIndex]}</span> : <span className="text-zinc-500 italic">Auto</span>}
        </div>
      </div>
    )
  );

  return (
    <>
      <div className="h-[12%] border-b border-white/10 flex items-center justify-between relative px-10">
        <span className="font-medium">Export Preview</span>
        <Button disabled={!structure || !parts || !selected} className="flex items-center space-x-2 text-sm w-32">
          <span>Copy</span>
          <HiOutlineClipboardDocumentList className="h-5 w-5" />
        </Button>
      </div>
      {data.keys && data.rows && (
        <Grid className="corner text-xs" columnCount={data.keys.length} columnWidth={120} height={425} rowCount={data.rows.length} rowHeight={35} width={1010}>
          {Cell}
        </Grid>
      )}
      <Overlay {...{ header, data, open, setOpen }} />
    </>
  );
};

export default Export;
