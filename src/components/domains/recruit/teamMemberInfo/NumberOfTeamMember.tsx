import { ICONS } from "@/constant/icons";

interface NumberOfTeamMemberProps {
  isInfinity?: boolean;
  isFilter?: boolean;
  handleMinusNumber: () => void;
  handlePlusNumber: () => void;
  numberOfTeamMembers: number | "제한없음";
}

export default function NumberOfTeamMember(props: NumberOfTeamMemberProps) {
  const { isInfinity, handleMinusNumber, handlePlusNumber, numberOfTeamMembers, isFilter = false } = props;

  const memberCountDisplay = isFilter
    ? numberOfTeamMembers === 1
      ? "-명"
      : `${numberOfTeamMembers}명`
    : `${numberOfTeamMembers}명`;

  return (
    <div className="w-full bg-white py-3 px-4 rounded-[5px] border border-gray-300 text-sm font-medium">
      <div className="flex justify-center items-center gap-[57px]">
        {isInfinity || numberOfTeamMembers === "제한없음" ? (
          "제한없음"
        ) : (
          <>
            <img
              src={ICONS.minusCircle.src}
              alt={ICONS.minusCircle.alt}
              onClick={() => handleMinusNumber()}
              className={` ${numberOfTeamMembers <= 2 ? "opacity-25" : "opacity-100 cursor-pointer"}`}
            />

            <div className="flex justify-center w-10">{memberCountDisplay}</div>
            <img
              src={ICONS.plusCircle.src}
              alt={ICONS.plusCircle.alt}
              onClick={() => handlePlusNumber()}
              className="cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
}
