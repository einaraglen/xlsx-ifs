import { useNavigate, useLocation } from "react-router-dom";
import { classNames } from "../../services/tools";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { useAppContext } from "../../services/context";

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

const Progress = () => {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  const { status } = useAppContext()

  return (
    <nav className="bg-zinc-900 h-20 shadow-lg fixed inset-x-0 z-50">
      <div className="grid grid-cols-4 pt-5">
        {steps.map((step, i) => (
          <button onClick={() => navigate(step.key)} key={step.key} className="flex flex-col items-center space-y-0 relative group focus:outline-none">
            <div
              className={classNames(
                progression[pathname] == i ? "bg-violet-600" : "bg-zinc-800",
                "ring-2  shadow-lg z-10 group-hover:-translate-y-1 group-hover:ring-violet-400 group-focus:ring-violet-400 ring-violet-600 flex items-center justify-center h-7 w-7 rounded-full transition-all duration-200"
              )}
            >
              <span className="font-semibold">{i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={classNames(
                  i < progression[pathname] ? "bg-violet-800" : "bg-transparent",
                  "absolute translate-x-1/2 translate-y-[8px] h-3 z-0 w-[16rem] transition-colors duration-500"
                )}
              />
            )}
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
