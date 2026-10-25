export type PostInfo = {
  thumbnail?: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export type Post = PostInfo & {
  id: string;
};

