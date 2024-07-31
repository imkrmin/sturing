import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

export const METADATA = {
  title: "Sturing : 스터링",
  description: "모집부터 진행까지 올인원 스터디 플랫폼",
  imageUrl: "https://ifowwhoiz6eixak7.public.blob.vercel-storage.com/sturing-dy4GhVsEjAcGKFmvN6LMaIM42R1V2F.png",
  url: process.env.LOCAL_URL as string,
  locale: "ko_KR",
  type: "website" as OpenGraphType,
  creator: "FourTen",
  generator: "Next.js",
  publisher: "FourTen",
  applicationName: "스터링",
  keywords: [
    "sturing",
    "스터링",
    "스터디",
    "웅진싱크빅",
    "Next.js",
    "App Router",
    "수코딩",
    "sucoding",
    "스나이퍼 팩토리",
    "sniper factory",
    "유데미",
    "udemy",
    "웅진씽크빅",
    "woongjin thinkbig",
  ],
  googleSiteVerification: `${process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}` as string,
  naverSiteVerification: `${process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}` as string,
};
