import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostsByCategory } from "../utils/posts";

const CATEGORY_LABELS: Record<string, string> = {
  category1: "겨울, 두 사람",
  category2: "Love affair",
  category3: "로맨스가 필요해",
};

const PAGE_SIZE = 20;

export default function PostListPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const isMobile = window.innerWidth < 768;

  const cat = category ?? "";
  const label = CATEGORY_LABELS[cat] ?? cat;
  const allPosts = getPostsByCategory(cat);
  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
  const posts = allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* Blur overlay */}
      <div
        className="fixed inset-0 z-20"
        style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
      />

      {/* Content area */}
      <main
        className="fixed top-0 h-full z-30 overflow-y-auto"
        style={
          isMobile
            ? { left: 0, width: "100vw", paddingTop: "4rem" }
            : { width: "70vw", left: "30vw" }
        }
      >
        <div className="px-5 md:px-12 py-16 max-w-3xl">
          {/* Category title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-10 cate-text">
            {label}
          </h1>

          {/* Post list */}
          {posts.length === 0 ? (
            <p className="text-sm tracking-wider">Now coming . . .</p>
          ) : (
            <ul className="flex gap-4 flex-wrap">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  onClick={() => navigate(`/posts/${cat}/${post.slug}`)}
                  className="flex items-baseline justify-between border-b border-white/15 py-5 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl md:text-5xl italic group-hover:opacity-60 transition-opacity">
                      {post.title}/
                    </h2>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex gap-3 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="text-xs tracking-widest w-8 h-8 transition-all"
                  style={{
                    color: "#141415",
                    borderBottom: p === page ? "1px solid white" : "1px solid transparent",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: p === page ? 700 : 400,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}