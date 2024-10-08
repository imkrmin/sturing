"use client";

import { useOptimistic, useRef } from "react";
import NoList from "../mystudy/NoList";
import { postCheckItemAction } from "@/lib/database/action/dashboard";
import { TCheckItem } from "@/types/dashboard";
import mongoose from "mongoose";
import CheckItem from "./CheckItem";

export default function MyCheckList({
  studyId,
  currentDate,
  contentList,
}: {
  studyId: any;
  currentDate: any;
  contentList: TCheckItem[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticCheckList, addOptimisticCheckList] = useOptimistic(
    contentList,
    (state: TCheckItem[], newCheckItemContent: TCheckItem) => [...state, newCheckItemContent],
  );

  const formAction = async (formData: FormData) => {
    const newCheckItemContent = formData.get("newCheckItemContent")?.toString() ?? "";

    addOptimisticCheckList({
      content: newCheckItemContent,
      isChecked: false,
      _id: new mongoose.Types.ObjectId(),
    });

    formRef?.current?.reset();

    await postCheckItemAction({
      studyId,
      newCheckItemDate: currentDate.toString(),
      newCheckItemContent,
    });
  };

  return (
    <>
      <form className="flex justify-start items-center gap-2 w-full" ref={formRef} action={formAction}>
        <input
          type="text"
          className="w-full border p-2 rounded focus:outline-none text-gray-900 text-sm font-medium leading-tight"
          placeholder="체크리스트를 입력해주세요"
          required
          name="newCheckItemContent"
        />
      </form>

      <ul className="mt-4">
        {optimisticCheckList?.length > 0 ? (
          optimisticCheckList.map((checkItem: any) => (
            <CheckItem key={checkItem._id} studyId={studyId} checkItem={checkItem} isMyCheckItem={true} />
          ))
        ) : (
          <NoList>해당 날짜에 체크리스트가 없어요.</NoList>
        )}
      </ul>
    </>
  );
}
