import { MoodBigBase } from "../MoodBase";
import { IMoodMiniBaseProps, MoodMiniBase } from "../MoodBase";

interface IMoodBigTagProps {
  children: React.ReactNode;
  src: string;
  alt: string;
  isActive: boolean;
}

export function MoodBigToggle(props: IMoodBigTagProps) {
  const { children, src, alt, isActive } = props;

  return (
    <label className="cursor-pointer">
      <input className="hidden" type="checkbox" />
      <MoodBigBase
        src={src}
        alt={alt}
        className={
          isActive
            ? "border-main-500 bg-main-100 text-main-500 font-semibold"
            : "border-gray-300 bg-white text-gray-600 font-medium"
        }>
        {children}
      </MoodBigBase>
    </label>
  );
}

interface IMoodMiniToggleProps extends Omit<IMoodMiniBaseProps, "className"> {
  isActive: boolean | undefined;
  onClick?: () => void;
}

export function MoodMiniToggle(props: IMoodMiniToggleProps) {
  const { children, src, alt, isActive, onClick } = props;

  return (
    <label className="cursor-pointer">
      <input className="hidden" type="checkbox" />
      <MoodMiniBase
        src={src}
        alt={alt}
        className={isActive ? "border-main-500 bg-main-100 text-main-500" : "border-gray-300 bg-white text-gray-600"}
        onClick={onClick}>
        {children}
      </MoodMiniBase>
    </label>
  );
}
