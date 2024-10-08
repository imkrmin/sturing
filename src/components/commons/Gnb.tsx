"use client";

import Link from "next/link";
import Button from "./Button";

import SideBar from "./SideBar";
import useToggle from "@/hooks/useToggle";
import useOpenToggle from "@/hooks/useOpenToggle";
import LoginModal from "../modal/LoginModal";
import { ICONS, LOGO } from "@/constant/icons";
import { useEffect, useState } from "react";
import { useMatchingStore } from "@/store/matchingStore";
import MatchingModal from "../modal/MatchingModal";
import { useUserStore } from "@/store/userStore";

// user session 받아올때 로딩 과정 추가해야함.
export default function Gnb() {
  const [sideBar, setSideBar, handleSideBar] = useToggle(false);
  const { isOpen, openToggle } = useOpenToggle();
  const { user, fetchUser } = useUserStore();
  const { matching, fetchMatching } = useMatchingStore();
  const [showMatchingModal, setShowMatchingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkMatching = async () => {
    await fetchMatching();
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    if (user) {
      checkMatching();
    }
  }, [user]);

  useEffect(() => {
    if (matching) {
      setShowMatchingModal(false);
    } else {
      if (!loading && user) {
        setShowMatchingModal(true);
      }
    }
  }, [matching, loading, user]);

  return (
    <div className="sticky top-0 bg-white w-full h-[54px] z-[1100] flex justify-between items-center px-4 border-b border-gray-300">
      <div className="flex justify-center items-center gap-2">
        <button type="button" onClick={handleSideBar}>
          <img src={ICONS.menu.src} alt={ICONS.menu.alt} width={24} height={24} />
        </button>
        <Link href="/">
          <img src={LOGO.logoText.src} alt={LOGO.logoText.alt} width={78} height={24} />
        </Link>
      </div>
      <SideBar sideBar={sideBar} setSideBar={setSideBar} user={user} />
      {user ? (
        <div className="flex justify-center items-center gap-3">
          <Link href="/preparing">
            <img src={ICONS.alarm.src} alt={ICONS.alarm.alt} width={24} height={24} />
          </Link>
          <Link href="/mypage">
            <img src={ICONS.mypage.src} alt={ICONS.mypage.alt} width={24} height={24} />
          </Link>
        </div>
      ) : (
        <div>
          <Button
            varient="ghost"
            addStyle="h-[34px] w-[71px] border border-main-500 text-main-500 rounded-[5px] font-medium text-[12px]"
            onClick={openToggle}>
            간편로그인
          </Button>
          {isOpen && <LoginModal onClose={openToggle} />}
        </div>
      )}
      {showMatchingModal && <MatchingModal onClose={() => setShowMatchingModal(false)} />}
    </div>
  );
}
