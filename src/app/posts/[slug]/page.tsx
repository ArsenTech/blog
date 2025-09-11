import PageLayout from "@/components/layout";
import BlogPost from "@/components/pages/blog-post";
import { getPostBySlug, getRelatedPosts } from "@/lib/helpers";
import { notFound } from "next/navigation";

interface SinglePostPageProps{
  params: Promise<{slug: string}>
}
export default async function SinglePostPage({params}: SinglePostPageProps){
    const {slug} = await params;
    const currPost = await getPostBySlug(slug);
    if(!currPost || !currPost.published) notFound();
    const relatedPosts = await getRelatedPosts(slug, currPost.tags)
    return (
      <PageLayout>
        <BlogPost postData={currPost} relatedPosts={relatedPosts}/>
      </PageLayout>
    )
}