import connectDB from "@/lib/database/db";
import { Application } from "@/schema/applicationSchema";
import { Study } from "@/schema/studySchema";
import { TeamMembers } from "@/schema/teamMemberSchema";

export async function GET(request: Request) {
  connectDB();
  const { searchParams } = new URL(request.url);
  const listType = searchParams.get("listType");
  const userId = searchParams.get("userId");

  try {
    switch (listType) {
      /*
       * PROGRESS, RECRUIT_END, DOME : 내가 참여하고 있는 모든 스터디 (개설 or 지원 후 ACCEPTED) 중 각 status로 필터링한 목록 조회
       */
      case "PROGRESS": {
        const myAcceptedTeamMember = await TeamMembers.find({
          members: {
            $elemMatch: { userId: userId, status: "ACCEPTED" },
          },
        }).select("studyId members");
        const studyIdList = myAcceptedTeamMember.map((member) => member.studyId);
        const studyList = await Study.find({
          _id: { $in: studyIdList },
          status: listType,
        }).populate({
          path: "teamMembersId",
          select: "members",
        });

        return Response.json({
          progressStudyList: studyList,
          recruitEndStudyListCount: await Study.countDocuments({
            _id: { $in: studyIdList },
            status: "RECRUIT_END",
          }),
        });
      }

      case "RECRUIT_END": {
        const myAcceptedTeamMember = await TeamMembers.find({
          members: {
            $elemMatch: { userId: userId, status: "ACCEPTED" },
          },
        }).select("studyId members");
        const studyIdList = myAcceptedTeamMember.map((member) => member.studyId);
        const studyList = await Study.find({
          _id: { $in: studyIdList },
          status: listType,
        }).populate({
          path: "teamMembersId",
          select: "members",
        });
        return Response.json({
          recruitEndStudyList: studyList,
          progressStudyListCount: await Study.countDocuments({
            _id: { $in: studyIdList },
            status: "PROGRESS",
          }),
        });
      }

      case "RECRUIT_START_OWNER": {
        // 내가 개설한 모든 스터디 중 status가 RECRUIT_START인 목록 조회
        const studyList = await Study.find({
          ownerId: userId,
          status: "RECRUIT_START",
        }).populate({
          path: "teamMembersId",
          select: "members",
        });

        const teamMembers = await TeamMembers.find({
          members: {
            $elemMatch: {
              userId: userId,
              isOwner: false,
            },
          },
        });
        const studyIdList = teamMembers.map((member) => member.studyId);
        const result = {
          recruitStartOwnerStudyList: studyList,
          recruitStartMemberStudyListCount: await Study.countDocuments({
            _id: { $in: studyIdList },
            status: "RECRUIT_START",
          }),
        };
        return Response.json(result);
      }

      case "RECRUIT_START_MEMBER": {
        // 내가 지원한 모든 스터디 중 status가 RECRUIT_START인 목록 조회
        const teamMembers = await TeamMembers.find({
          members: {
            $elemMatch: {
              userId: userId,
              isOwner: false,
            },
          },
        });
        const studyIdList = teamMembers.map((member) => member.studyId);
        const studyList = await Study.find({
          _id: { $in: studyIdList },
          status: "RECRUIT_START",
        }).populate({
          path: "teamMembersId",
          model: "TeamMembers",
          select: {
            members: {
              $elemMatch: { userId: userId },
            },
          },
        });

        const enhancedStudyList = await Promise.all(
          studyList.map(async (study) => {
            // 내 지원서 id 추출
            const myApplicationId = study.teamMembersId.members[0].applicationId;
            // 지원서 생성일 조회
            const application = await Application.findById({ _id: myApplicationId }, { createdAt: 1 });
            return {
              ...study.toObject(), // 스터디
              applicationCreatedAt: application.createdAt, // 필드 추가
            };
          }),
        );

        return Response.json({
          recruitStartMemberStudyList: enhancedStudyList,
          recruitStartOwnerStudyListCount: await Study.countDocuments({
            ownerId: userId,
            status: "RECRUIT_START",
          }),
        });
      }

      case "DONE": {
        const myAcceptedTeamMember = await TeamMembers.find({
          members: {
            $elemMatch: { userId: userId, status: "ACCEPTED" },
          },
        }).select("studyId members");
        const studyIdList = myAcceptedTeamMember.map((member) => member.studyId);
        const studyList = await Study.find({
          _id: { $in: studyIdList },
          status: listType,
        }).populate({
          path: "teamMembersId",
          select: "members",
          populate: {
            path: "members.userId",
            model: "User",
            select: "nickname",
          },
        });

        return Response.json(studyList);
      }

      default:
        throw new Error("listType이 잘못되었습니다.");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
