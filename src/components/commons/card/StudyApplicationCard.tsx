import StudyApplyInfo from "./element/StudyApplyInfo";
import Avatar from "../Avatar";
import { TApplicationSummary } from "@/types/application";
import StudyCardLink from "./element/StudyCardLink";
import { getFirstInterestLevel } from "@/utils/getFirstInterestLevel";
import { CATEGORY } from "@/constant/category";
import { CAREER_LIST } from "@/constant/teamMemberInfo";
import { format } from "date-fns";
import Link from "next/link";

export default function StudyApplicationCard(props: TApplicationSummary) {
  const { _id, userId, profileImageUrl, status, nickname, title, levels, createdAt } = props;
  const { interest, level } = levels ? getFirstInterestLevel(levels.levels) : { interest: null, level: null };

  const applicationCreatedAt = createdAt ? `${format(new Date(createdAt), "yyyy.MM.dd HH:mm")} 지원` : "";

  return (
    <article className="flex flex-col gap-4 px-5 py-6 bg-white border border-gray-300 rounded-lg">
      <StudyApplyInfo status={status} createAt={applicationCreatedAt} />

      <Link href={`/profile/${userId}`} className="flex items-center justify-stretch gap-3">
        <Avatar width={40} height={40} profileImageUrl={profileImageUrl} hasBorder={true} />
        <div>
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-[-0.36px]">
            <span className="text-gray-700">{nickname}</span>
            {interest && level && (
              <>
                <span className="w-[1px] h-3 bg-gray-400"></span>
                <span className="text-gray-600">{CATEGORY(interest)}</span>
                <span className="w-[1px] h-3 bg-gray-400"></span>
                <span className="text-gray-600">{CAREER_LIST[level]}</span>
              </>
            )}
          </div>
          <p className="text-[12px] font-semibold tracking-[-0.36px] text-gray-900">{title}</p>
        </div>
      </Link>

      <StudyCardLink href={`/application/${_id}`}>지원서 보기</StudyCardLink>
    </article>
  );
}
