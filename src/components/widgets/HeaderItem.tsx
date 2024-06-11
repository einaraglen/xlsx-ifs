import { useDraggable } from "@dnd-kit/core";
import { classNames } from "../../services/tools";

interface Props {
  data: string;
  hide: boolean;
}

const HeaderItem = (props: Props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.data,
    data: {
      header: props.data,
    },
  });
  return (
    <div
      className={classNames(props.hide ? "opacity-0" : "opacity-100", "ml-10 w-44 flex justify-center items-center py-1.5 bg-zinc-900/30 ring-1 ring-inset ring-white/10 hover:bg-zinc-900 overflow-hidden shadow-lg rounded-full transition-colors duration-200")}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className="w-32 truncate text-center text-xs">{props.data}</div>
    </div>
  );
};

export default HeaderItem;
