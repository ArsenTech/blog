import BlogPost from "@/components/pages/blog-post";
import { KEYWORDS } from "@/lib/constants";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/helpers";
import { absoluteURL } from "@/lib/helpers/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface SinglePostPageProps{
  params: Promise<{slug: string}>
}

export const revalidate = 86400

export const generateStaticParams = async() => {
  const allSlugs = await getAllSlugs();
  return allSlugs.map(slug => ({slug}))
}

export const generateMetadata = async({params}: SinglePostPageProps): Promise<Metadata> => {
  const {slug} = await params;
  const currPost = await getPostBySlug(slug);
  if(!currPost || !currPost.published) return notFound();
  const ogImage = absoluteURL(`/api/og?title=${encodeURIComponent(currPost.title)}&description=${encodeURIComponent(currPost.description)}&date=${currPost.date.toISOString()}`)
  return {
    title: currPost.title,
    description: currPost.description,
    keywords: [...currPost.tags,...KEYWORDS],
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
      tags: currPost.tags,
      images: {
        url: ogImage,
        width: 1200,
        height: 630
      }
    },
    twitter: {
      images: [{
        url: ogImage,
        width: 1200,
        height: 630
      }],
      card: "summary_large_image",
      title: currPost.title,
      description: currPost.description,
    },
    alternates: {
      canonical: absoluteURL(`/posts/${slug}`)
    }
  }
}

export default async function SinglePostPage({params}: SinglePostPageProps){
  const {slug} = await params;
  const currPost = await getPostBySlug(slug);
  if(!currPost || !currPost.published) notFound();
  const relatedPosts = await getRelatedPosts(slug, currPost.tags)
  return (
    <BlogPost
      postData={currPost}
      relatedPosts={relatedPosts}
    />
  )
}