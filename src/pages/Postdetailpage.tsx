import { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PasswordModal from "../components/PasswordModal";

const allMdx = import.meta.glob("/src/posts/**/*.mdx") as Record<
  string,
  () => Promise<{ default: React.ComponentType; frontmatter: Record<string, string> }>
>;

export default function PostDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [PostContent, setPostContent] = useState<React.ComponentType | null>(null);
  const [meta, setMeta] = useState<{ title: string; date: string; password?: string } | null>(null);

  const cat = category ?? "";
  const s = slug ?? "";

  useEffect(() => {
    const key = `/src/posts/${cat}/${s}.mdx`;
    const loader = allMdx[key];
    if (!loader) return;

    loader().then((mod) => {
      setPostContent(() => mod.default);
      setMeta({
        title: mod.frontmatter?.title ?? s,
        date: mod.frontmatter?.date ?? "",
        password: mod.frontmatter?.password,
      });
    });

  }, [cat, s]);

  const handleUnlock = () => {
    // sessionStorage.setItem(sessionKey, "true");
    setUnlocked(true);
  };

  const isProtected = meta?.password && !unlocked;

  return (
    <>
      {/* Blur overlay */}
      <div
        className="fixed inset-0 z-20"
        style={{ backdropFilter: "blur(20px)", background: "rgba(255,255,255,0.5)" }}
      />

      {/* Password modal */}
      {isProtected && (
        <PasswordModal
            correctPassword={meta!.password!}
            onSuccess={handleUnlock}
            onClose={() => navigate(`/posts/${cat}`)}  // ← 추가
        />
    )}

      {/* Content area */}
      <main
        className="fixed top-0 right-0 h-full z-30 overflow-y-auto"
        style={{ width: "70vw", left: "30vw" }}
      >
        <div className="px-12 py-16 max-w-3xl">
          {/* Back button */}
          <button
            onClick={() => navigate(`/posts/${cat}`)}
            className="text-xs  uppercase mb-10 transition-colors flex items-center gap-2"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            ← 목록으로
          </button>

          {meta && (
            <>
              <p className="text-xs  mb-3">{meta.date}</p>
              <h1
                className="text-2xl font-bold mb-10"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)", fontFamily: "'Georgia', serif" }}
              >
                {meta.title}
              </h1>
            </>
          )}

          {/* MDX content */}
          {!isProtected && PostContent && (
            <Suspense fallback={<p className="text-sm">로딩 중...</p>}>
              <div className="mdx-content">
                <PostContent />
              </div>
            </Suspense>
          )}
        </div>
      </main>
    </>
  );
}