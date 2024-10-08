"use client";

import Image from "next/image";
import { BOOKMARK } from "@/constant/icons";
import { useEffect, useState } from "react";
import {
  createLectureBookmarkAction,
  deleteLectureBookmarkAction,
  deleteStudyBookmarkAction,
  createStudyBookmarkAction,
} from "@/utils/bookmarkUtils";

interface ScrapButtonProps {
  variant: "detail" | "card";
  id: string;
  page: "study" | "lecture";
  userId: string;
}

export interface Bookmark {
  lectureId?: string;
  studyId?: string;
  userId: string;
  id: string;
}

export default function ScrapButton({ variant, id, page, userId }: ScrapButtonProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isChecked, setChecked] = useState<boolean>(false);
  const [scrapCount, setScrapCount] = useState<number>(0);
  const isDetail = variant === "detail";
  const isStudy = page === "study";

  const fetchBookmarkData = async () => {
    try {
      const response = await fetch(`/api/${isStudy ? "study" : "lecture"}/${id}/bookmark`);
      if (!response.ok) {
        throw new Error(`${isStudy ? "스터디" : "강의"} 찜 리스트 불러오기 실패`);
      }

      const bookmarkData = await response.json();

      setBookmarks(bookmarkData);
      setScrapCount(bookmarkData.length);
      setChecked(bookmarkData.some((bookmark: Bookmark) => bookmark.userId === userId));
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (isChecked) {
        const bookmarkToDelete = bookmarks.find((bookmark: Bookmark) => bookmark.userId === userId);
        if (bookmarkToDelete) {
          const { id } = bookmarkToDelete;
          if (page === "lecture") {
            await deleteLectureBookmarkAction(id, id);
          } else if (page === "study") {
            await deleteStudyBookmarkAction(id, id);
          }
          setScrapCount((prevCount) => prevCount - 1);
        }
      } else {
        if (page === "lecture") {
          await createLectureBookmarkAction(id, userId);
        } else if (page === "study") {
          await createStudyBookmarkAction(id, userId);
        }
        setScrapCount((prevCount) => prevCount + 1);
      }
      setChecked(!isChecked);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookmarkData();
  }, [isChecked]);

  return (
    <div className={isDetail ? "w-[52px] h-[50px] flex flex-col items-center justify-center" : ""}>
      <form className="w-[26px] h-[26px]">
        <button type="button" onClick={handleBookmark}>
          {isChecked ? (
            <Image src={BOOKMARK.blueOn.src} alt={BOOKMARK.blueOn.alt} width={26} height={26} />
          ) : (
            <Image src={BOOKMARK.grayOff.src} alt={BOOKMARK.grayOff.alt} width={26} height={26} />
          )}
        </button>
      </form>
      {isDetail && (
        <span
          className={`text-[12px] leading-[150%] tracking-tight font-normal ${
            isChecked ? "text-main-500" : "text-gray-700"
          }`}>
          {scrapCount}
        </span>
      )}
    </div>
  );
}
