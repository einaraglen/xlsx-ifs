import { ReactNode } from "react"
import { classNames } from "@services/tools"

interface Props {
    className?: string
    onClick?: any
    children: ReactNode
    disabled?: boolean
}

const Button = (props: Props) => {
    return (
        <button disabled={props.disabled} onClick={props.onClick} className={classNames(props.className || "py-2 px-5", "disabled:cursor-not-allowed disabled:opacity-50 inline-flex shadow-lg justify-center overflow-hidden font-medium transition rounded-lg bg-violet-700 active:bg-violet-900 text-zinc-200 ring-0 ring-inset ring-transparent hover:bg-violet-600")}>
            {props.children}
        </button>
    )
}

export default Button;