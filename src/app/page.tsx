import BlogItem from "@/components/blog/blog-item";
import { BlogWidget, BlogWidgetCard } from "@/components/blog/blog-widget";
import PageLayout from "@/components/layout";
import LandingSection from "@/components/layout/landing-section";
import SiteSection from "@/components/layout/section";
import BlogPagination from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { POSTS_PER_PAGE, blogs } from "@/lib/constants";
import { Search } from "lucide-react";

interface HomepageProps{
  searchParams: Promise<{page?: string}>
}
export default async function Home({searchParams}: HomepageProps) {
  const {page} = await searchParams;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE)

  const sortedPosts = blogs.slice(
    POSTS_PER_PAGE * (currentPage-1),
    POSTS_PER_PAGE * currentPage
  )
  return (
    <PageLayout>
      <main>
        <LandingSection/>
        <SiteSection id="blog" innerWidthClass="space-y-4 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-3">
          <div className="space-y-5">
            {sortedPosts.map(post=>(
              <BlogItem key={post.slug} postData={post}/>
            ))}
            <BlogPagination totalPages={totalPages}/>
          </div>
          <div className="space-y-4 relative md:sticky top-0 lg:top-[85px] h-fit">
            <div className="flex items-center gap-3">
              <Search className="size-6 shrink-0"/>
              <Input type="text" placeholder="Search tutorials, coding tips..."/>
            </div>
            <BlogWidget title="Widget Name">
              {blogs.slice(0,3).map(post=>(
                <BlogWidgetCard key={post.slug} postData={post}/>
              ))}
            </BlogWidget>
          </div>
        </SiteSection>
      </main>
    </PageLayout>
  );
}
