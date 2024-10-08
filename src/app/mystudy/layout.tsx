import { Metadata } from "next";
import Gnb from "@/components/commons/Gnb";
import TapBar from "@/components/commons/TapBar";
import UpcomingStudy from "@/components/domains/mystudy/UpcomingStudy";
import CreateStudyButton from "@/components/commons/CreateStudyButton";
import MyStudyTab from "@/components/domains/mystudy/MyStudyTab";
import { getSession } from "@/lib/database/getSession";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "내 스터디",
};

export default async function Layout({ tabs }: { tabs: React.ReactNode }) {
  const session = await getSession();
  const isLoggedIn = !!session;
  if (!isLoggedIn) redirect("/login");

  if (isLoggedIn)
    return (
      <>
        <Gnb />
        <TapBar />
        <UpcomingStudy />
        <MyStudyTab />
        {tabs}
        <CreateStudyButton />
      </>
    );
}
