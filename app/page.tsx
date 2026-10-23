import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <main className="Page">
      <h1>최근 글</h1>
      <div className="Cardgrid">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </main>
  );
}
