"use client";

import Button from "@/components/commons/Button";
import CardList from "@/components/commons/CardList";
import TabMenuButton from "@/components/commons/TabMenuButton";
import LectureCard from "@/components/commons/card/LectureCard";
import StudyRecruitCard from "@/components/commons/card/StudyRecruitCard";
import { useEffect, useState } from "react";
import SortFilterButton from "./SortFilterButton";
import { useFilterStore, useSearchTabMenuStore } from "@/store/FilterStore";
import Link from "next/link";
import { TLectureListCardData } from "@/types/api/lecture";
import { TStudyRecruitCardData } from "@/types/api/study";
import { useRouter } from "next/navigation";
import NoResultText from "@/components/commons/NoResultText";

import { TLectureListQuery, TStudyListQuery } from "@/types/filter";
import { useSearchResultStore } from "@/store/SearchResultStore";
import SearchResultStudyListSkeletons from "@/components/commons/skeleton/SearchResultStudyListSkeletons";
import LectureListSkeletons from "@/components/commons/skeleton/LectureListSkeletons";

export default function Content() {
  const { menu, setTabMenu } = useSearchTabMenuStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {
    studyList,
    lectureList,
    studyPage,
    lecturePage,
    setStudyPage,
    setLecturePage,
    hasStudyNextPage,
    hasLectureNextPage,
    fetchLectureList,
    fetchStudyList,
  } = useSearchResultStore();

  const router = useRouter();
  const { searchQuery, categories, locations, memberCount, startDate, endDate, levels, roles, sortBy } =
    useFilterStore();

  const studyQuery: TStudyListQuery = {
    search: searchQuery,
    categories,
    locations,
    memberCount,
    startDate,
    endDate,
    levels,
    roles,
    sortBy,
  };

  const lectureQuery: TLectureListQuery = { categories, search: searchQuery };

  const fetchSearchResult = async () => {
    setIsLoading(true);
    try {
      await fetchStudyList(studyQuery, studyPage);
      await fetchLectureList(lectureQuery, lecturePage);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const handleStudyLoadMore = () => {
    if (hasStudyNextPage) {
      setIsFetchingMore(true);
      setStudyPage(studyPage + 1);
    }
  };

  const handleLectureLoadMore = () => {
    if (hasLectureNextPage) {
      setIsFetchingMore(true);
      setLecturePage(lecturePage + 1);
    }
  };

  useEffect(() => {
    fetchSearchResult();
  }, [
    searchQuery,
    memberCount,
    categories,
    locations,
    startDate,
    endDate,
    levels,
    roles,
    sortBy,
    studyPage,
    lecturePage,
  ]);

  return (
    <>
      <article>
        <nav className="px-4 pt-[2px] flex justify-between items-center gap-3 bg-white border-b border-gray-200">
          <TabMenuButton onClick={() => setTabMenu("total")} title="전체" isSelected={menu === "total"} />
          <TabMenuButton onClick={() => setTabMenu("study")} title="스터디" isSelected={menu === "study"} />
          <TabMenuButton onClick={() => setTabMenu("lecture")} title="강의" isSelected={menu === "lecture"} />
        </nav>
        {menu !== "lecture" && (
          <section className="px-4 pt-5 pb-10">
            {menu === "total" && (
              <h1 className="text-base text-gray-1000 font-semibold leading-snug mb-[17px]">스터디</h1>
            )}
            <div className="flex flex-col gap-5 items-end">
              {menu === "study" && <SortFilterButton />}
              {(isLoading && !isFetchingMore) || studyList === null ? (
                <SearchResultStudyListSkeletons cardCount={menu === "total" ? 4 : 6} />
              ) : studyList?.length !== 0 ? (
                <CardList>
                  {menu === "total"
                    ? studyList?.slice(0, 4).map((study: TStudyRecruitCardData) => (
                        <div key={study.id} className="w-full">
                          <StudyRecruitCard
                            recruitCardData={study}
                            onClick={() => {
                              router.push(`/study/${study.id}`);
                            }}
                            isMini
                          />
                        </div>
                      ))
                    : studyList.map((study: TStudyRecruitCardData) => (
                        <StudyRecruitCard
                          recruitCardData={study}
                          onClick={() => {
                            router.push(`/study/${study.id}`);
                          }}
                          key={study.id}
                          isMini
                        />
                      ))}
                </CardList>
              ) : (
                <NoResultText>검색 결과가 없습니다.</NoResultText>
              )}
            </div>
            {studyList?.length !== 0 && menu === "total" && (
              <Button
                onClick={() => setTabMenu("study")}
                varient="ghost"
                addStyle="text-gray-800 border-gray-400 w-full px-5 py-[14px] rounded-lg mt-6">
                스터디 전체보기
              </Button>
            )}
            {studyList?.length !== 0 && hasStudyNextPage && menu === "study" && (
              <Button
                onClick={handleStudyLoadMore}
                varient="ghost"
                disabled={isLoading}
                addStyle="text-gray-800 border-gray-400 w-full px-5 py-[14px] rounded-lg mt-6">
                스터디 더 불러오기
              </Button>
            )}
          </section>
        )}
        {menu === "total" && <div className="bg-gray-200 w-full h-[6px]" />}
        {menu !== "study" && (
          <section className="px-4 pt-5 pb-10">
            {menu === "total" && (
              <h1 className="text-base text-gray-1000 font-semibold leading-snug mb-[17px]">강의</h1>
            )}
            <div className="flex flex-col gap-[14px]">
              {(isLoading && !isFetchingMore) || lectureList === null ? (
                <LectureListSkeletons cardCount={menu === "total" ? 2 : 8} />
              ) : lectureList?.length !== 0 ? (
                menu === "total" ? (
                  lectureList.slice(0, 2).map((lecture: TLectureListCardData) => (
                    <Link key={lecture.id} href={`/lecture/${lecture.id}`}>
                      <LectureCard lecture={lecture} variant="card" />
                    </Link>
                  ))
                ) : (
                  lectureList.map((lecture: TLectureListCardData) => (
                    <Link key={lecture.id} href={`/lecture/${lecture.id}`}>
                      <LectureCard lecture={lecture} variant="card" />
                    </Link>
                  ))
                )
              ) : (
                <NoResultText>검색 결과가 없습니다.</NoResultText>
              )}
            </div>
            {lectureList?.length !== 0 && menu === "total" && (
              <Button
                onClick={() => setTabMenu("lecture")}
                varient="ghost"
                addStyle="text-gray-800 border-gray-400 w-full px-5 py-[14px] rounded-lg mt-6">
                강의 전체보기
              </Button>
            )}
            {lectureList?.length !== 0 && hasLectureNextPage && menu === "lecture" && (
              <Button
                onClick={handleLectureLoadMore}
                disabled={isLoading}
                varient="ghost"
                addStyle="text-gray-800 border-gray-400 w-full px-5 py-[14px] rounded-lg mt-6">
                강의 더 불러오기
              </Button>
            )}
          </section>
        )}
      </article>
    </>
  );
}
