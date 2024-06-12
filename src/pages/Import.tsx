import FileDrop from "../components/widgets/FileDrop";
import { FadeDrop } from "../components/layout/Animations";

const Import = () => {
  return (
    <FadeDrop className="flex h-full w-full items-center justify-center">
      <FileDrop />
    </FadeDrop>
  );
};

export default Import;
