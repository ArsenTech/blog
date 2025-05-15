import PageLayout from "@/components/layout";
import PostLayout from "@/components/layout/post-layout";
import { getPostBySlug } from "@/lib/helpers";
import { notFound } from "next/navigation";

interface SinglePostPageProps{
  params: Promise<{slug: string}>
}

export default async function SinglePostPage({params}: SinglePostPageProps){
    const {slug} = await params;
    const currPost = getPostBySlug(slug);
    if(!currPost) notFound();
    return (
      <PageLayout>
        <PostLayout postData={currPost}/>
      </PageLayout>
    )
}