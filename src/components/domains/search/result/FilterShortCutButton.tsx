import { ReactNode } from "react";
import { rightArrowGray } from "../../../../../public/icons/icons";

interface FilterShortCutButtonProps extends React.ComponentProps<"button"> {
  text: string;
  isActive: boolean;
}

export default function FilterShortCutButton({ text, isActive, ...props }: FilterShortCutButtonProps) {
  return (
    <>
      <button
        {...props}
        className={`h-[35px] flex justify-center items-center gap-[3px] border ${
          isActive ? "border-main-300 text-main-400" : "border-main-200 text-gray-800"
        } rounded-[5px] py-[7px] pl-[15px] pr-[10px] text-sm font-semibold  leading-normal shrink-0`}>
        {text}
        <img src={rightArrowGray.src} alt={rightArrowGray.alt} width={15} className="rotate-90" />
      </button>
    </>
  );
}
