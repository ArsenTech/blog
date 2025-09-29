import LandingPage from "@/components/pages/landing";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { getAllPosts, getCategories } from "@/lib/helpers";

interface HomepageProps{
  searchParams: Promise<{query?: string, page?: string, pageSize?:string}>
}
export default async function Home({searchParams}: HomepageProps) {
  const {page, pageSize, query} = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const postsPerPage = pageSize ? parseInt(pageSize) : POSTS_PER_PAGE;
  const posts = await getAllPosts();
  const categories = await getCategories(posts);
  const totalPages = Math.ceil(posts.length / postsPerPage)
  return (
    <LandingPage
      pageSize={postsPerPage}
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
      categories={categories}
      query={query || ""}
    />
  );
}
