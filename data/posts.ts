export type PostInfo = {
  thumbnail?: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export type Post = PostInfo & {
  id: number;
};

export const posts: Post[] = [
  {
    thumbnail: "/images/day.png",
    id: 1,
    tags: ["React", "성능"],
    title: "React 렌더링 최적화 — memo와 useCallback은 언제 써야 할까",
    summary:
      "불필요한 리렌더링이 왜 생기는지 확인하고, memo와 useCallback을 실제로 써야 하는 상황과 아닌 상황을 구분합니다",
    date: "2026.10.18",
  },
  {
    id: 2,
    tags: ["Next.js", "블로그"],
    title: "Next.js App Router로 블로그 만들기 1편 — 구조 잡기",
    summary:
      "App Router의 폴더 구조와 레이아웃 개념을 익히고, 블로그의 홈·전체 글·글 상세 페이지 뼈대를 세웁니다.",
    date: "2026.10.12",
  },
  {
    id: 3,
    tags: ["CSS", "다크 모드"],
    title: "CSS 변수로 다크 모드 구현하기",
    summary:
      "색을 역할별 변수로 정리하고, 테마 전환 버튼으로 라이트와 다크를 바꾸는 과정을 기록합니다.",
    date: "2026.10.05",
  },
  {
    id: 4,
    tags: ["TypeScript"],
    title: "TypeScript 제네릭, 처음으로 이해한 날",
    summary:
      "타입을 매개변수처럼 쓴다는 말이 무슨 뜻인지, 직접 만든 유틸 함수로 하나씩 풀어 봅니다.",
    date: "2026.09.28",
  },
  {
    id: 5,
    tags: ["Browser", "CS"],
    title: "브라우저는 HTML을 어떻게 화면에 그릴까",
    summary:
      "DOM과 CSSOM, 렌더 트리, 레이아웃과 페인트까지 브라우저 렌더링 과정을 그림과 함께 정리합니다.",
    date: "2026.09.20",
  },
  {
    id: 6,
    tags: ["Git", "협업"],
    title: "Git 브랜치 전략 — 혼자 할 때와 팀으로 할 때",
    summary:
      "개인 프로젝트와 팀 프로젝트에서 브랜치를 나누는 방식이 어떻게 달라지는지 경험을 바탕으로 비교합니다.",
    date: "2026.09.14",
  },
];

const firstTags = posts.map((post) => post.tags[0]);

const pickSet = new Set(firstTags);

export const pickTags = ["전체", ...pickSet];
