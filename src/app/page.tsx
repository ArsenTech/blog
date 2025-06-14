import PageLayout from "@/components/layout";
import LandingPage from "@/components/pages/landing";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { getAllPosts, getCategories } from "@/lib/helpers";

interface HomepageProps{
  searchParams: Promise<{page?: string}>
}
export default async function Home({searchParams}: HomepageProps) {
  const {page} = await searchParams;
  const currentPage = page ? +page : 1;
  const posts = getAllPosts();
  const categories = getCategories(posts);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  return (
    <PageLayout>
      <LandingPage posts={posts} currentPage={currentPage} totalPages={totalPages} categories={categories}/>
    </PageLayout>
  );
}
