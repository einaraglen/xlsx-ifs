import { Switch } from "@headlessui/react";
import { classNames } from "@services/tools";

type Props = {
    value: boolean
    setValue: (state: boolean) => void
    disabled?: boolean
}

const Toggle = ({ value, setValue, disabled = false }: Props) => {
return (
    <div className="h-8 w-16 rounded-2xl ring-1 ring-white/15 ring-inset shadow-lg">
   <Switch
      checked={value}
      onChange={(value: boolean) => setValue(value)}
      disabled={disabled}
      className={classNames(
        value ? "bg-zinc-900/30" : "bg-zinc-900/30",
        "relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-2xl disabled:cursor-not-allowed disabled:opacity-40 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-transparent"
      )}
    >
      <span
        className={classNames(
            value ? "translate-x-9 bg-violet-600" : "translate-x-1 bg-zinc-700",
          "pointer-events-none relative inline-block h-6 w-6 transform translate-y-1 rounded-full  shadow-md ring-0 transition duration-200 ease-in-out"
        )}
      >
        <span
          className={classNames(
            value ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 12 12">
            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span
          className={classNames(
            value ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <svg className="h-4 w-4 text-violet-200" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
    </div>
)
}

export default Toggle;