import FixedBottomBar from "@/components/domains/detail/FixedBottomBar";
import Header from "@/components/domains/detail/Header";
import Contents from "@/components/domains/detail/study/Contents";
import { getSession } from "@/lib/database/getSession";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const getStudyInfo = async (id: string) => {
  const session = await getSession();
  const userId = session?.user?.id || "";
  try {
    const response = await fetch(`${process.env.LOCAL_URL}/api/study/${id}`, {
      headers: {
        Authorization: "Bearer " + userId,
      },
    });
    const studyData = await response.json();

    return studyData;
  } catch (error) {
    console.error("Error fetching study", error);
    throw error;
  }
};

const getCommentsInfo = async (id: string) => {
  try {
    const response = await fetch(`${process.env.LOCAL_URL}/api/study/${id}/comment`, { cache: "no-store" });
    const commentData = await response.json();
    return commentData;
  } catch (error) {
    console.error("Error fetching study", error);
    throw error;
  }
};

interface IGenerateMetadataProps {
  params: { id: string };
}

export async function generateMetadata({ params }: IGenerateMetadataProps): Promise<Metadata> {
  const id = params.id;

  const { study } = await getStudyInfo(id);

  return {
    title: study?.title,
    openGraph: {
      images: [study?.imageUrl],
    },
  };
}

export default async function StudyDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const studyData = await getStudyInfo(id);
  const commentData = await getCommentsInfo(id);

  const studyId = studyData?.study?._id;
  if (!studyId) notFound();

  return (
    <>
      <div className="flex-col inline-flex w-full h-dvh">
        <div className="flex-1 overflow-auto scrollbar-hide">
          <Header page="study" studyInfo={studyData.study} lectureInfo={studyData.lecture} />
          <Contents
            study={studyData.study}
            lecture={studyData.lecture}
            memberList={studyData.teamMemberList}
            commentList={commentData}
          />
        </div>
        <FixedBottomBar page="study" id={id} study={studyData} />
      </div>
    </>
  );
}
