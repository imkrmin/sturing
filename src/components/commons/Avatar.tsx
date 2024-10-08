import { IMAGES_DEFAUlT } from "@/constant/images";
import Image from "next/image";

export default function Avatar({
  profileImageUrl,
  width,
  height,
  hasBorder = false,
}: {
  profileImageUrl: string | null;
  width: number;
  height: number;
  hasBorder?: boolean;
}) {
  const imageSrc = profileImageUrl || IMAGES_DEFAUlT.profile.src;

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-full shrink-0 ${hasBorder && "border border-gray-300"}`}
        style={{ width: `${width}px`, height: `${height}px` }}>
        <Image src={imageSrc} alt="프로필 이미지" sizes={`${width}px`} fill style={{ objectFit: "cover" }} />
      </div>
    </>
  );
}
