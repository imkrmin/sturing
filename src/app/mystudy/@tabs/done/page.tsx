import { useMyStudyListStore } from "@/store/myStudyListStore";
import { TMyStudy } from "@/types/study";
import { fetchDoneStudyListAction } from "@/lib/database/action/myStudyList";
import NoList from "@/components/domains/mystudy/NoList";
import StudyDoneCard from "@/components/commons/card/StudyDoneCard";

export default async function DoneTabPage() {
  const myStudyListType = useMyStudyListStore.getState().myStudyListType;
  let myStudyList: TMyStudy[] = [];

  if (myStudyListType === "DONE") {
    myStudyList = await fetchDoneStudyListAction();
  }
  return (
    <div className="flex flex-col py-5 gap-4 px-4">
      {myStudyList &&
        myStudyListType === "DONE" &&
        (myStudyList.length === 0 ? (
          <NoList>완료된 스터디가 없어요.</NoList>
        ) : (
          myStudyList.map((study) => <StudyDoneCard key={study._id.toString()} study={study} />)
        ))}
    </div>
  );
}
