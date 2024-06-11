import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Button from "../components/widgets/Button";
import { useEffect, useState, memo } from "react";
import { useAppContext } from "../services/context";
import useInvoke from "../services/invoke";
import { FixedSizeGrid as Grid } from "react-window";

const Export = () => {
  const { structure, parts, selected } = useAppContext();
  const { exportData } = useInvoke();
  const [data, setData] = useState({ keys: [], rows: [] });

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

  const Cell = memo(({ columnIndex, rowIndex, style }: any) =>
    rowIndex == 0 ? (
      <button className="bg-zinc-900 text-left hover:bg-violet-600 flex space-x-1 items-center pl-2 font-semibold shadow-md border-b border-r border-white/10" style={style}>
        <div className="w-[99%] truncate">
          {data.keys[columnIndex] || "BLANK"}
          </div>
      </button>
    ) : (
      <div className="flex items-center pl-2 border-b border-r border-white/10" style={style}>
        <div className="w-[95%] truncate">
          {data.rows[rowIndex][columnIndex] ? <span>{data.rows[rowIndex][columnIndex]}</span> : <span className="text-zinc-400 italic">Auto</span>}
        </div>
      </div>
    )
  );

  return (
    <>
      <div className="h-[12%] border-b border-white/10 flex items-center justify-between relative px-10">
        <span className="font-semibold">Export Ready!</span>
        <Button disabled={!structure || !parts || !selected} className="flex items-center space-x-2 text-sm w-32">
          <span>Copy</span>
          <HiOutlineClipboardDocumentList className="h-5 w-5" />
        </Button>
      </div>

      {data.keys && data.rows && (
        <Grid className="corner text-xs" columnCount={data.keys.length} columnWidth={100} height={425} rowCount={data.rows.length} rowHeight={35} width={1010}>
          {Cell}
        </Grid>
      )}
    </>
  );
};

export default Export;
