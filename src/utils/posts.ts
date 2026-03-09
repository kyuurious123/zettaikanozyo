export interface PostMeta {
  slug: string;
  category: string;
  title: string;
  date: string;
  password?: string;
}

// Vite의 import.meta.glob으로 모든 MDX 파일 로드
const allPosts = import.meta.glob("/src/posts/**/*.mdx", { eager: true }) as Record<
  string,
  { frontmatter: Omit<PostMeta, "slug" | "category"> }
>;

export function getPostsByCategory(category: string): PostMeta[] {
  return Object.entries(allPosts)
    .filter(([path]) => path.includes(`/posts/${category}/`))
    .map(([path, mod]) => {
      const slug = path.split("/").pop()?.replace(".mdx", "") ?? "";
      return {
        slug,
        category,
        title: mod.frontmatter?.title ?? slug,
        date: mod.frontmatter?.date ?? "",
        password: mod.frontmatter?.password,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getPost(category: string, slug: string) {
  const key = `/src/posts/${category}/${slug}.mdx`;
  const mod = allPosts[key];
  if (!mod) return null;
  return mod;
}