import { FadeDrop } from "../components/layout/Animations";
import ImportButton from "../components/widgets/ImportButton";

const Copy = () => {
  return (
    <FadeDrop className="flex h-full w-full items-center justify-center">
      <ImportButton />
    </FadeDrop>
  );
};

export default Copy;
