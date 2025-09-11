import PageLayout from "@/components/layout";
import BlogPost from "@/components/pages/blog-post";
import { getPostBySlug, getRelatedPosts } from "@/lib/helpers";
import { absoluteURL } from "@/lib/helpers/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface SinglePostPageProps{
  params: Promise<{slug: string}>
}

const getCurrentPost = cache(getPostBySlug)

export const generateMetadata = async({params}: SinglePostPageProps): Promise<Metadata> => {
  const {slug} = await params;
  const currPost = await getCurrentPost(slug);
  if(!currPost || !currPost.published) return notFound();
  return {
    title: currPost.title,
    description: currPost.description,
    keywords: currPost.tags,
    authors: [
      {
        name: "ArsenTech",
        url: "https://arsentech.github.io/"
      }
    ],
    openGraph: {
      title: currPost.title,
      description: currPost.description,
      url: absoluteURL(`/posts/${slug}`),
      siteName: "ArsenTech Blog",
      locale: "en_US",
      type: "article",
      publishedTime: currPost.date.toISOString(),
      authors: "ArsenTech",
      images: {
        url: absoluteURL(`/api/og?title=${currPost.title}&description=${currPost.description}&date=${currPost.date}`),
        width: 1200,
        height: 630
      }
    },
    twitter: {
      images: {
        url: absoluteURL(`/api/og?title=${currPost.title}&description=${currPost.description}&date=${currPost.date}`),
        width: 1200,
        height: 630
      },
      card: "summary_large_image",
      title: currPost.title,
      description: currPost.description,
    },
  }
}

export default async function SinglePostPage({params}: SinglePostPageProps){
  const {slug} = await params;
  const currPost = await getCurrentPost(slug);
  if(!currPost || !currPost.published) notFound();
  const relatedPosts = await getRelatedPosts(slug, currPost.tags)
  return (
    <PageLayout>
      <BlogPost postData={currPost} relatedPosts={relatedPosts}/>
    </PageLayout>
  )
}