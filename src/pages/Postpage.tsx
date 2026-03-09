import { useParams } from "react-router-dom";

const CATEGORY_LABELS: Record<string, string> = {
  category1: "카테고리1",
  category2: "카테고리2",
  category3: "카테고리3",
};

// 임시 더미 글 목록
const DUMMY_POSTS: Record<string, { id: number; title: string; date: string; content: string }[]> = {
  category1: [
    { id: 1, title: "첫 번째 글", date: "2025.01.01", content: "글 내용이 여기에 들어갑니다." },
    { id: 2, title: "두 번째 글", date: "2025.01.05", content: "두 번째 글 내용입니다." },
  ],
  category2: [
    { id: 1, title: "카테고리2 첫 글", date: "2025.02.01", content: "내용입니다." },
  ],
  category3: [],
};

export default function PostPage() {
  const { category } = useParams<{ category: string }>();
  const label = CATEGORY_LABELS[category ?? ""] ?? category;
  const posts = DUMMY_POSTS[category ?? ""] ?? [];

  return (
    <>
      {/* Blur overlay */}
      <div
        className="fixed inset-0 z-20"
        style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
      />

      {/* Content area */}
      <main
        className="fixed top-0 right-0 h-full z-30 overflow-y-auto"
        style={{
          width: "80vw",
          left: "30vw",
        }}
      >
        <div className="px-12 py-16 max-w-3xl">
          {/* Category title */}
          <h1
            className="text-white text-3xl font-bold tracking-widest uppercase mb-10"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              fontFamily: "'Georgia', serif",
            }}
          >
            {label}
          </h1>

          {/* Post list */}
          {posts.length === 0 ? (
            <p className="text-white/50 text-sm tracking-wider">아직 글이 없습니다.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="border-b border-white/20 pb-6 cursor-pointer group"
                >
                  <p className="text-white/40 text-xs tracking-widest mb-1">{post.date}</p>
                  <h2
                    className="text-white text-lg font-semibold mb-2 group-hover:opacity-70 transition-opacity"
                    style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed">{post.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}