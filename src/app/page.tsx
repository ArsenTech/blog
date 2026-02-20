import PageLayout from "@/components/layout";
import LandingPage from "@/components/pages/landing";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { getAllPosts, getCategories } from "@/lib/helpers";
import { absoluteURL } from "@/lib/helpers/seo";
import type { Metadata } from "next";

interface HomepageProps{
  searchParams: Promise<{query?: string, page?: string, pageSize?:string}>
}
export const generateMetadata = async({searchParams}: HomepageProps): Promise<Metadata> => {
  const {page, pageSize} = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const postsPerPage = pageSize ? parseInt(pageSize) : POSTS_PER_PAGE;
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage)
  return {
    pagination: {
      previous: currentPage > 1 ? absoluteURL(`/?page=${currentPage - 1}`) : undefined,
      next: currentPage < totalPages ? absoluteURL(`/?page=${currentPage + 1}`) : undefined
    },
    alternates: {
      canonical: absoluteURL("/")
    }
  }
}
export default async function Home({searchParams}: HomepageProps) {
  const {page, pageSize, query} = await searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const postsPerPage = pageSize ? parseInt(pageSize) : POSTS_PER_PAGE;
  const posts = await getAllPosts();
  const categories = await getCategories(posts);
  return (
    <PageLayout>
      <LandingPage
        pageSize={postsPerPage}
        posts={posts}
        currentPage={currentPage}
        totalPages={posts.length}
        categories={categories}
        query={query || ""}
      />
    </PageLayout>
  );
}
