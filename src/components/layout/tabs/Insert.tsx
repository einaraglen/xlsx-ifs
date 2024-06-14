import { Fragment } from "react/jsx-runtime";
import Button from "../../widgets/Button";
import { HiOutlinePencil } from "react-icons/hi2";
import { useAppContext } from "../../../services/context";
import { ChangeEvent, useEffect, useState } from "react";
import useAppHandler from "../../../services/handler";

const Insert = () => {
  const [value, setValue] = useState<string>("");
  const { header, setOverlay, inserts } = useAppContext();
  const { setInsert } = useAppHandler();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onInsert = () => {
    if (header != null) {
      setInsert(header.header, value);
      setOverlay(false);
    }
  };

  useEffect(() => {
    if (!header || !inserts) {
      return;
    }

    setValue(inserts[header.header] || "");
  }, [header]);

  return (
    <Fragment>
      <div className="flex space-x-2 px-5">
        <span className="font-medium w-44 truncate">{header?.header}</span>
      </div>
      <div className="flex space-x-2 px-5">
        <input
          value={value}
          onChange={onChange}
          placeholder="Starts with..."
          className="rounded-lg bg-zinc-900/80 w-full focus:ring-white/40 ring-1 ring-white/20 ring-inset py-2 px-5 text-sm outline-none shadow-lg focus:outline-none transition-all duration-150"
        />
        <Button onClick={onInsert} className="flex items-center justify-between text-sm w-36 px-2">
          <span>Insert</span>
          <HiOutlinePencil className="h-5 min-w-4 w-4" />
        </Button>
      </div>
    </Fragment>
  );
};

export default Insert;
