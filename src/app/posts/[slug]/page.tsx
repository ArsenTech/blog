import PageLayout from "@/components/layout";
import PostLayout from "@/components/layout/post-layout";
import { getPostBySlug, getRelatedPosts } from "@/lib/helpers";
import { notFound } from "next/navigation";
import extractTOC from "@/lib/helpers";

interface SinglePostPageProps{
  params: Promise<{slug: string}>
}

export default async function SinglePostPage({params}: SinglePostPageProps){
    const {slug} = await params;
    const currPost = getPostBySlug(slug);
    if(!currPost || !currPost.published) notFound();
    const relatedPosts = getRelatedPosts(slug, currPost.tags)
    const toc = extractTOC(currPost.content)
    return (
      <PageLayout>
        <PostLayout toc={toc} postData={currPost} relatedPosts={relatedPosts}/>
      </PageLayout>
    )
}