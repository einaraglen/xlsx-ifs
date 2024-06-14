import { FadeDrop } from "@layout/Animations";
import ImportButton from "@widgets/ImportButton";

const Copy = () => {
  return (
    <FadeDrop className="flex h-full w-full items-center justify-center">
      <ImportButton />
    </FadeDrop>
  );
};

export default Copy;
