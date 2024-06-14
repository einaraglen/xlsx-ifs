import FileDrop from "@widgets/FileDrop";
import { FadeDrop } from "@layout/Animations";

const Import = () => {
  return (
    <FadeDrop className="flex h-full w-full items-center justify-center">
      <FileDrop />
    </FadeDrop>
  );
};

export default Import;
