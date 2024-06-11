import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import Button from "../widgets/Button";

type Props = FallbackProps

const ErrorFallback = (props: Props) => {
    let navigate = useNavigate();

    const onRecover = async () => {
        navigate(-1)
        await new Promise((r) => setTimeout(r, 100))
        props.resetErrorBoundary()
    }

    return (
        <div className="h-full pt-20">
            {props.error.message}
            <Button onClick={onRecover}>Recover</Button>
            </div>
    )
}

export default ErrorFallback;