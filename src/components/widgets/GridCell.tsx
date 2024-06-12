import { classNames } from "../../services/tools";

interface Props {
  filters: any;
  filter: any;
  data: { keys: string[]; rows: (string | number | null)[][] };
  columnIndex: number;
  rowIndex: number;
  style: any;
  onHeaderSelection: any;
}

const GridCell = ({ filters, filter, data, columnIndex, rowIndex, style, onHeaderSelection }: Props) => {
  if (rowIndex == 0) {
    return (
      <button
        onClick={() => onHeaderSelection(columnIndex, data.keys[columnIndex] || "BLANK")}
        className={classNames(
          filters[data.keys[columnIndex] || "BLANK"] != null ? "bg-violet-900" : "bg-zinc-900",
          " text-left hover:bg-violet-600 transition-colors duration-100 flex space-x-1 items-center pl-2 font-medium shadow-md border-b border-r border-white/10"
        )}
        style={style}
      >
        <div className="w-[95%] truncate">{data.keys[columnIndex] || "BLANK"}</div>
      </button>
    );
  } else {
    return (
      <div className={classNames(filter[rowIndex - 1] && "bg-rose-400/10", "flex items-center pl-2 border-b border-r border-white/10 relative")} style={style}>
        <div className={classNames(filter[rowIndex - 1] && "opacity-50", "w-[95%] truncate")}>
          {data.rows[rowIndex - 1][columnIndex] ? <span>{data.rows[rowIndex - 1][columnIndex]}</span> : <span className="text-zinc-500 italic">Auto</span>}
        </div>
      </div>
    );
  }
};

export default GridCell;
