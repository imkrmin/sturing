import { TRole } from "@/constant/teamMemberInfo";
import { TLectureInfoData } from "./lecture";

export type TCategory =
  | "DESIGN"
  | "DEVELOP"
  | "BUSINESS"
  | "MARKETING"
  | "ECONOMY"
  | "LANGUAGE"
  | "LICENSE"
  | "SELF-DEVELOPMENT";

export type TTeamMember = {
  memberId: string;
  nickname: string;
  profileImageUrl: string;
  role: TRole;
  isOwner: boolean;
  status: "APPLIED" | "APPLIED_VIEW" | "ACCEPTED";
};

export type TStudyDetail = {
  _id: string;
  ownerId: string;
  isMine?: boolean;
  category: TCategory;
  lectureId: string;
  title: string;
  imageUrl: string;
  description: string;
  meeting: {
    format: string;
    platform: string;
    location: string;
    schedule: {
      day: string;
      time: string;
    };
  };
  startDate: Date;
  endDate: Date;
  status: string;
  moodKeywords: string[];
  task: string[];
  wantedMember: {
    career: string[];
    count: number | "제한없음";
    age: string[];
    role: TRole[];
  };
  scrapCount: number;
  createdAt: string;
  updateAt: string;
  __v: number;
  teamMemberId: string[];
};

export type TStudyDetailInfoData = {
  study: TStudyDetail;
  lecture: TLectureInfoData;
  teamMemberList: TTeamMember[];
  isBookmarked?: boolean;
  comment: TComment[];
};

export type TStudyRecruitCardData = {
  id: string;
  ownerId: string;
  category: string;
  title: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  meeting: { format: string; platform?: string; location?: string; schedule: { day: string; time: string } };
  wantedMemberCount: string | number;
  acceptedTeamMemberCount: number;
  isBookmarked?: boolean;
};

export type TStudyListData = { studyList: TStudyRecruitCardData[]; hasNextPage: boolean; currentPage: number };

export type TComment = {
  id: string;
  studyId: string;
  userId: string;
  nickname: string;
  profileImageUrl: string;
  content: string;
  createdAt: string;
};

// export type TFetchStudyList
