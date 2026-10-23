import PostCard from "@/components/PostCard";
import {posts} from "@/data/posts"

export default function Home() {
  return (
    <main className="Page">
      <h1>최근 글</h1>
      <div className="Cardgrid">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            tags={post.tags}
          />
        ))}
      </div>
    </main>
  );
}
