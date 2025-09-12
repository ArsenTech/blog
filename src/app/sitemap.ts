import { SITE_URL } from "@/lib/constants";
import { getAllSlugs, getAllTags, getPostBySlug } from "@/lib/helpers";
import { absoluteURL } from "@/lib/helpers/seo";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
     const allTags = await getAllTags();
     const allSlugs = await getAllSlugs();
     console.log(allTags, allSlugs);
     const searchTagPages: MetadataRoute.Sitemap = allTags.map(tag=>({
          url: absoluteURL(`/search/${tag}`),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7
     }))
     const searchPostPages: MetadataRoute.Sitemap = await Promise.all(allSlugs.map(async slug=>{
          const post = await getPostBySlug(slug);
          return {
               url: absoluteURL(`/posts/${slug}`),
               lastModified: post?.date ?? new Date(),
               changeFrequency: "weekly",
               priority: 0.9
          }
     }))
     const latestDate = searchPostPages.length>0 ? new Date(Math.max(...searchPostPages.map(p => new Date(p.lastModified as string).getTime()))) : new Date()
     return [
          {
               url: SITE_URL,
               lastModified: latestDate,
               changeFrequency: "monthly",
               priority: 1
          },
          ...searchPostPages,
          ...searchTagPages
     ]
}