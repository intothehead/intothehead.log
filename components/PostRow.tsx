type PostRowProps = {
  title: string;
  date: string;
  tag: string;
};

export default function PostRow({ title, date, tag }: PostRowProps) {
  return (
    <li>
      <time>{date}</time>
      <span>{tag}</span>
      <h2>{title}</h2>
    </li>
  );
}
