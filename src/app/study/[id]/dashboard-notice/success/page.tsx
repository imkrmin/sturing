"use client";

import AlertMessage from "@/components/commons/AlertMessage";
import Button from "@/components/commons/Button";
import Link from "next/link";

export default function SuccessPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex flex-col px-4 w-full h-dvh">
      <div className="flex flex-1 flex-col justify-center w-full">
        <AlertMessage varient="board" />
      </div>
      <div className="py-4 bg-white flex flex-col gap-3">
        <Link href={`/study/${id}/dashboard/board`}>
          <Button
            type="button"
            varient="filled"
            addStyle="w-full h-[50px] bg-main-500 rounded-[5px] shrink-0 text-white font-semibold text-4">
            해당 게시판으로 가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
