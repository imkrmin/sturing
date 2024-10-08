import {
  bookmarkWhiteOn,
  bookmarkWhiteOff,
  bookmarkBlueOn,
  bookmarkGrayOff,
  bookmarkGrayOn,
  menu,
  back,
  share,
  alarm,
  close,
  imageCancel,
  location,
  message,
  more,
  mypage,
  searchBlue,
  rightArrowBlack,
  rightArrowwhite,
  rightArrowGray,
  rightArrowDarkGray,
  search,
  searchFilter,
  sendComment,
  moreWhite,
  backWhite,
  shareWhite,
  star,
  date,
  teammate,
  schedule,
  checkSquare,
  checkGray,
  checkBlue,
  add,
  addGray,
  barGray,
  closeBlue,
  defaultProfileImg,
  question,
  logoBlue,
  logoColor,
  logoCreate,
  logoText,
  githubLogo,
  design,
  develop,
  marketing,
  business,
  economic,
  language,
  certificate,
  selfDevelop,
  friendly,
  professional,
  serious,
  systematic,
  passionate,
  responsible,
  learningFocused,
  collaborative,
  proactive,
  freewheeling,
  checkOn,
  checkOff,
  checkSquareOn,
  checkSquareOff,
  badOn,
  badOff,
  goodOn,
  goodOff,
  bestOn,
  bestOff,
  ready,
  success,
  notFound,
  postInfoTeamMember,
  postInfoMeeting,
  postInfoTask,
  postInfoLocation,
  postInfoInstructor,
  postInfoLevel,
  moreVertical,
  camera,
  cameraCircle,
  toggleCheckBlue,
  toggleCheckGray,
  minusCircle,
  plusCircle,
  rightArrowBlackBold,
  locationBlack,
  toolTipBlue,
  closeBright,
  reset,
  starEmpty,
  wastebasket,
} from "../../public/icons/icons";

type TIcon = {
  src: string;
  alt: string;
};

//북마크 아이콘, 뒤로가기, 알람 , 사람 , 공유하기 아이콘 등등 기본적인 icons

export const BOOKMARK: { [key: string]: TIcon } = {
  whiteOn: { src: bookmarkWhiteOn.src, alt: "Bookmark On" },
  whiteOff: { src: bookmarkWhiteOff.src, alt: "Bookmark Off" },
  grayOn: { src: bookmarkGrayOn.src, alt: "Bookmark On" },
  grayOff: { src: bookmarkGrayOff.src, alt: "Bookmark Off" },
  blueOn: { src: bookmarkBlueOn.src, alt: "Bookmark On" },
};

export const ICONS: { [key: string]: TIcon } = {
  menu: {
    src: menu.src,
    alt: "메뉴",
  },
  close: { src: close.src, alt: "닫기" },

  wastebasket: { src: wastebasket.src, alt: "휴지통" },

  closeBright: { src: closeBright.src, alt: "삭제하기" },
  closeBlue: {
    src: closeBlue.src,
    alt: "닫기",
  },
  imageCancel: {
    src: imageCancel.src,
    alt: "이미지 취소",
  },
  back: { src: back.src, alt: "뒤로가기" },
  backWhite: { src: backWhite.src, alt: "뒤로가기" },
  mypage: { src: mypage.src, alt: "마이페이지" },
  share: {
    src: share.src,
    alt: "공유하기",
  },
  shareWhite: {
    src: shareWhite.src,
    alt: "공유하기",
  },
  alarm: { src: alarm.src, alt: "알람" },
  location: {
    src: location.src,
    alt: "위치",
  },
  locationBlack: {
    src: locationBlack.src,
    alt: "위치",
  },
  message: { src: message.src, alt: "메세지" },
  more: { src: more.src, alt: "더보기" },
  moreVertical: { src: moreVertical.src, alt: "더보기 세로 아이콘" },
  moreWhite: { src: moreWhite.src, alt: "더보기" },
  search: {
    src: search.src,
    alt: "검색",
  },
  searchBlue: {
    src: searchBlue.src,
    alt: "검색",
  },
  searchFilter: {
    src: searchFilter.src,
    alt: "검색 필터",
  },
  rightArrowBlack: {
    src: rightArrowBlack.src,
    alt: "오른쪽 화살표",
  },
  rightArrowWhite: {
    src: rightArrowwhite.src,
    alt: "오른쪽 화살표",
  },
  rightArrowGray: {
    src: rightArrowGray.src,
    alt: "자세히 보기",
  },
  rightArrowDarkGray: {
    src: rightArrowDarkGray.src,
    alt: "찜 목록 열기",
  },
  rightArrowBlackBold: {
    src: rightArrowBlackBold.src,
    alt: "링크로 가기",
  },
  sendComment: {
    src: sendComment.src,
    alt: "댓글 작성하기",
  },
  star: {
    src: star.src,
    alt: "별점",
  },
  starEmpty: {
    src: starEmpty.src,
    alt: "빈 별점",
  },
  date: {
    src: date.src,
    alt: "날짜",
  },
  teammate: {
    src: teammate.src,
    alt: "팀원",
  },
  schedule: {
    src: schedule.src,
    alt: "달력",
  },
  checkSquare: {
    src: checkSquare.src,
    alt: "체크 박스",
  },
  checkGray: {
    src: checkGray.src,
    alt: "회색 체크",
  },
  checkBlue: {
    src: checkBlue.src,
    alt: "파란색 체크",
  },
  checkOn: {
    src: checkOn.src,
    alt: "체크 활성화",
  },
  checkOff: {
    src: checkOff.src,
    alt: "체크 비활성화",
  },
  checkSquareOn: {
    src: checkSquareOn.src,
    alt: "체크 활성화",
  },
  checkSquareOff: {
    src: checkSquareOff.src,
    alt: "체크 비활성화",
  },
  add: {
    src: add.src,
    alt: "추가",
  },
  addGray: {
    src: addGray.src,
    alt: "url 추가",
  },
  barGray: {
    src: barGray.src,
    alt: "회색 바",
  },
  reset: {
    src: reset.src,
    alt: "초기화",
  },
  defaultProfileImg: {
    src: defaultProfileImg.src,
    alt: "기본 프로필 이미지",
  },
  question: {
    src: question.src,
    alt: "물음표",
  },
  ready: {
    src: ready.src,
    alt: "준비 중",
  },
  success: {
    src: success.src,
    alt: "완료",
  },
  notFound: {
    src: notFound.src,
    alt: "404",
  },
  postInfoTeamMember: {
    src: postInfoTeamMember.src,
    alt: "글쓰기",
  },
  postInfoMeeting: {
    src: postInfoMeeting.src,
    alt: "모집하는 팀원 수",
  },
  postInfoTask: {
    src: postInfoTask.src,
    alt: "스터디 과제",
  },
  postInfoLocation: {
    src: postInfoLocation.src,
    alt: "스터디 장소",
  },
  postInfoInstructor: {
    src: postInfoInstructor.src,
    alt: "강사",
  },
  postInfoLevel: {
    src: postInfoLevel.src,
    alt: "난이도",
  },
  camera: {
    src: camera.src,
    alt: "카메라",
  },
  cameraCircle: {
    src: cameraCircle.src,
    alt: "카메라_원형배경",
  },
  toggleCheckBlue: {
    src: toggleCheckBlue.src,
    alt: "토글 활성화",
  },
  toggleCheckGray: {
    src: toggleCheckGray.src,
    alt: "토글 비활성화",
  },
  minusCircle: {
    src: minusCircle.src,
    alt: "마이너스",
  },
  plusCircle: {
    src: plusCircle.src,
    alt: "플러스",
  },
  toolTipBlue: {
    src: toolTipBlue.src,
    alt: "말풍선",
  },
};

export const LOGO = {
  logoBlue: {
    src: logoBlue.src,
    alt: "파란색 로고",
  },
  logoColor: {
    src: logoColor.src,
    alt: "컬러 로고",
  },
  logoCreate: {
    src: logoCreate.src,
    alt: "스터디 생성 로고",
  },
  logoText: {
    src: logoText.src,
    alt: "글씨 로고",
  },
  githubLogo: {
    src: githubLogo.src,
    alt: "깃허브 로고",
  },
};

export const STUDY_CATEGORY = {
  design: {
    src: design.src,
    alt: "디자인",
  },
  develop: {
    src: develop.src,
    alt: "개발 · 테크",
  },
  marketing: {
    src: marketing.src,
    alt: "기획 · 마케팅",
  },
  business: {
    src: business.src,
    alt: "비즈니스",
  },
  economic: {
    src: economic.src,
    alt: "경제",
  },
  language: {
    src: language.src,
    alt: "외국어",
  },
  certificate: {
    src: certificate.src,
    alt: "자격증",
  },
  selfDevelop: {
    src: selfDevelop.src,
    alt: "자기 계발",
  },
};

export const MOOD = {
  friendly: {
    src: friendly.src,
    alt: "친근한",
  },
  professional: {
    src: professional.src,
    alt: "전문적인",
  },
  serious: {
    src: serious.src,
    alt: "진지한",
  },
  systematic: {
    src: systematic.src,
    alt: "체계적인",
  },
  passionate: {
    src: passionate.src,
    alt: "열정적인",
  },
  responsible: {
    src: responsible.src,
    alt: "책임감있는",
  },
  learningFocused: {
    src: learningFocused.src,
    alt: "학습중심적",
  },
  collaborative: {
    src: collaborative.src,
    alt: "협력적인",
  },
  proactive: {
    src: proactive.src,
    alt: "자기주도적",
  },
  freewheeling: {
    src: freewheeling.src,
    alt: "자유로운",
  },
};

export const SATISFACTION = {
  badOn: {
    src: badOn.src,
    alt: "나쁨 활성화",
  },
  badOff: {
    src: badOff.src,
    alt: "나쁨 비활성화",
  },
  goodOn: {
    src: goodOn.src,
    alt: "좋음 활성화",
  },
  goodOff: {
    src: goodOff.src,
    alt: "좋음 비활성화",
  },
  bestOn: {
    src: bestOn.src,
    alt: "최고 활성화",
  },
  bestOff: {
    src: bestOff.src,
    alt: "최고 비활성화",
  },
};
