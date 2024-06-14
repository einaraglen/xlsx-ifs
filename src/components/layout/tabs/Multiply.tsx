import { Fragment } from "react/jsx-runtime";
import { useAppContext } from "../../../services/context";
import { HiMiniVariable } from "react-icons/hi2";
import Button from "../../widgets/Button";
import { ChangeEvent, useEffect, useState } from "react";
import useAppHandler from "../../../services/handler";

const Multiply = () => {
  const [value, setValue] = useState<number | null>(null);
  const { header, setOverlay, multipliers } = useAppContext();
  const { setMultiplier } = useAppHandler();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
        setValue(null)
    } else if (isNaN(Number(e.target.value))) {
        setValue(null)
    } else {
        setValue(Number(e.target.value));
    }
  };

  const onMultiply = () => {
    if (header != null) {
      setMultiplier(header.header, value);
      setOverlay(false);
    }
  };

  useEffect(() => {
    if (!header || !multipliers) {
      return;
    }

    setValue(multipliers[header.header])
  }, [header]);

  return (
    <Fragment>
      <div className="flex space-x-2 px-5">
        <span className="font-medium w-44 truncate">{header?.header}</span>
      </div>
      <div className="flex space-x-2 px-5">
        <input
          type="number"
          value={value || ""}
          onChange={onChange}
          placeholder="Multiplier..."
          className="rounded-lg bg-zinc-900/80 w-full focus:ring-white/40 ring-1 ring-white/20 ring-inset py-2 px-5 text-sm outline-none shadow-lg focus:outline-none transition-all duration-150"
        />
        <Button onClick={onMultiply} className="flex items-center justify-between text-sm w-36 px-2">
          <span>Multiply</span>
          <HiMiniVariable className="h-5 min-w-5 w-5" />
        </Button>
      </div>
    </Fragment>
  );
};

export default Multiply;
