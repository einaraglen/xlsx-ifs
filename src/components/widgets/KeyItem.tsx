import { useDroppable } from "@dnd-kit/core";
import { classNames } from "../../services/tools";
import { Fragment } from "react/jsx-runtime";
import { HiLink } from "react-icons/hi2";
import { useAppContext } from "../../services/context";
import { HiOutlineXCircle } from "react-icons/hi2";

interface Props {
  data: string;
}

const KeyZone = (props: Props) => {
  const { selected, deleteSelection } = useAppContext();
  const { isOver, setNodeRef } = useDroppable({
    id: props.data,
  });

  return (
    <Fragment>
      <div
        ref={setNodeRef}
        className={classNames(
          isOver ? "scale-105 ring-violet-400" : "ring-white/10",
          "w-52 h-8 bg-zinc-900/30 ring-1 rounded-full ring-inset transition-all shadow-lg flex items-center justify-between px-3"
        )}
      >
        <div className="w-32 truncate text-xs">{selected && selected[props.data]}</div>
        {selected && selected[props.data] && (
          <button onClick={() => deleteSelection(props.data)} className="text-zinc-500 hover:text-rose-500 transition-all duration-200 h-full w-8 flex justify-end items-center">
            <HiOutlineXCircle className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-center w-full">
        <HiLink className={classNames(selected && selected[props.data] != null ? "opacity-100" : "opacity-0", "text-emerald-500 transition-all")} />
      </div>
      <div className="flex items-center text-xs">{props.data.length == 0 ? <span className="text-zinc-400 italic">Blank</span> : <div className="truncate font-medium">{props.data}</div>}</div>
    </Fragment>
  );
};

export default KeyZone;
