import { useNavigate, useLocation } from "react-router-dom";
import { classNames } from "../../services/tools";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import useAppHandler from "../../services/handler";

const steps = [
  {
    title: "Import Structure",
    key: "/",
  },
  {
    title: "Import File",
    key: "/import",
  },
  {
    title: "Select Fields",
    key: "/select",
  },
  {
    title: "Export",
    key: "/export",
  },
];

const progression: Record<string, number> = {
  "/": 0,
  "/import": 1,
  "/select": 2,
  "/export": 3,
};

const progress_bar = ["0rem", "15.7rem", "31.5rem", "47.3rem"]

const Progress = () => {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  const { status } = useAppHandler()

  return (
    <nav className="bg-zinc-900 h-20 shadow-lg fixed inset-x-0 z-50 border-b border-white/15">
      <div style={{ width: progress_bar[progression[pathname]] }} className="absolute z-0 h-3 w-[47.3rem] bg-violet-800 top-[1.75rem] left-32 transition-all duration-500 rounded-full" />
      <div className="grid grid-cols-4 pt-5">
        {steps.map((step, i) => (
          <button disabled={i != 0 && !status(steps[i - 1].key)} onClick={() => navigate(step.key)} key={step.key} className="flex flex-col items-center space-y-0 relative group focus:outline-none disabled:cursor-not-allowed">
            <div
              className={classNames(
                progression[pathname] == i ? "bg-violet-600" : "bg-zinc-800",
                "ring-2  shadow-lg z-10 group-hover:-translate-y-1 group-hover:ring-violet-400 group-focus:ring-violet-400 ring-violet-600 flex items-center justify-center h-7 w-7 rounded-full transition-all duration-200"
              )}
            >
              <span className="font-medium">{i + 1}</span>
            </div>
            <div className="relative">
            <span className={classNames(i <= progression[pathname] ? "text-zinc-200" : "text-zinc-500", "text-xs transition-all duration-200")}>{step.title}</span>
              {status(step.key) && <HiOutlineCheckCircle className="text-emerald-500 h-4 w-4 absolute top-1.5 -right-5" />}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Progress;
