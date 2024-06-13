import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import Button from "../widgets/Button";
import { HiArrowPath } from "react-icons/hi2";
import { FadeDrop } from "./Animations";
import { useEffect } from "react";
import useInvoke from "../../services/invoke";

type Props = FallbackProps;

const ErrorFallback = (props: Props) => {
  let navigate = useNavigate();
  const { showDialog } = useInvoke();

  const onRecover = async () => {
    navigate(-1);
    await new Promise((r) => setTimeout(r, 100));
    props.resetErrorBoundary();
  };

  useEffect(() => {
    showDialog({
        type: "error",
        title: "Internal Error",
        message: "Something is not working as it should!",
        buttons: ["OK"],
      });
  }, [])

  return (
    <FadeDrop className="h-full pt-20 flex items-center justify-center">
      <div className="flex flex-col space-y-3 w-64">
        <div className="flex flex-col">
          <span className="font-medium text-rose-400">Internal Error:</span>
          <span className="text-sm text-zinc-400">{props.error.message}</span>
        </div>
        <Button onClick={onRecover} className="flex items-center space-x-2">
          <span>Recover</span>
          <HiArrowPath className="h-5 w-5" />
        </Button>
      </div>
    </FadeDrop>
  );
};

export default ErrorFallback;
