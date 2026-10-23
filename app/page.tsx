export default function Home() {
  return (
    <>
      <h1>최근 글</h1>
      <article className="Postcard">
        <div className="Thumbnail">
          <span className="Blogname">intothehead.log</span>
        </div>
        <div className="Body">
          <div className="Tags">
            <span className="Tag">React</span>
            <span className="Tag">성능</span>
          </div>
          <h2 className="Title">
            React 렌더링 최적화 — memo와 useCallback은 언제 써야 할까
          </h2>
          <p className="Summary">
            불필요한 리렌더링이 왜 생기는지 확인하고, memo와 useCallback을
            실제로 써야 하는 상황과 아닌 상황을 구분
          </p>
          <time className="Date">2026.10.18</time>
        </div>
      </article>
    </>
  );
}
