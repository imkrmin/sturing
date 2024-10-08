"use client";

import useOpenToggle from "@/hooks/useOpenToggle";
import { more, moreWhite, share, shareWhite } from "../../../public/icons/icons";
import ShareModal, { TShareInfo } from "../modal/ShareModal";
import { useState } from "react";
import Popover from "./Popover";

interface IShareButtonProps {
  showMore?: boolean;
  isWhite: boolean;
  isMine: boolean;
  shareInfo?: TShareInfo;
  onPopoverClick?: () => void;
}

export default function ShareButton({ showMore, isWhite, isMine, shareInfo, onPopoverClick }: IShareButtonProps) {
  const shareIcon = isWhite ? shareWhite : share;
  const moreIcon = isWhite ? moreWhite : more;
  const { isOpen, setIsOpen, openToggle } = useOpenToggle();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMoreClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <button type="button" onClick={handleShareClick}>
        <img src={shareIcon.src} alt={shareIcon.alt} width={24} height={24} />
      </button>
      {isOpen && <ShareModal onClose={openToggle} shareInfo={shareInfo} />}
      {isMine && showMore && (
        <button type="button" onClick={handleMoreClick} className="relative">
          <img src={moreIcon.src} alt={moreIcon.alt} width={24} height={24} />
        </button>
      )}
      {isPopoverOpen && onPopoverClick && <Popover onClick={onPopoverClick} />}
    </div>
  );
}
