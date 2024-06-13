// import { motion } from "framer-motion";
import { useAppContext } from "../../services/context";
import { classNames } from "../../services/tools";

interface Props {
  columnIndex: number;
  rowIndex: number;
  style: any;
}

const GridCell = ({ columnIndex, rowIndex, style }: Props) => {
  const { filters, filter, setOverlay, setHeader, data } = useAppContext();

  const onHeaderSelection = (index: number, header: string) => {
    setOverlay(true);
    setHeader({ index, header });
  };

  if (!data) {
    return null;
  }

  if (rowIndex == 0) {
    return (
      <button
        onClick={() => onHeaderSelection(columnIndex, data.keys[columnIndex] || "BLANK")}
        className={classNames(
          filters && filters[data.keys[columnIndex] || "BLANK"] != null ? "bg-violet-900" : "bg-zinc-900",
          " text-left hover:bg-violet-600 transition-colors duration-100 flex space-x-1 items-center pl-2 font-medium shadow-md border-b border-r border-white/10"
        )}
        style={style}
      >
        <div className="w-[95%] truncate">{data.keys[columnIndex] || "BLANK"  }</div>
      </button>
    );
  } else {
    return (
      <div className={classNames(filter[rowIndex - 1] && "bg-rose-400/10", "flex items-center pl-2 border-b border-r border-white/10 relative animate-show-component")} style={style}>
        <div className={classNames(filter[rowIndex - 1] && "opacity-50", "w-[95%] truncate")}>
          {data.rows[rowIndex - 1][columnIndex] ? <span>{data.rows[rowIndex - 1][columnIndex]}</span> : <span className="text-zinc-500 italic">Auto</span>}
        </div>
      </div>
    );
  }
};

export default GridCell;
