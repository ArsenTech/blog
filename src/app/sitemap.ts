import { SITE_URL } from "@/lib/constants";
import { getAllCategories, getAllSlugs, getAllTags, getPostBySlug } from "@/lib/helpers";
import { absoluteURL } from "@/lib/helpers/seo";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
     const allTags = await getAllTags();
     const allSlugs = await getAllSlugs();
     const allCategories = await getAllCategories();
     const searchTagPages: MetadataRoute.Sitemap = allTags.map(tag=>({
          url: absoluteURL(`/tags/${tag}`),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7
     }))
     const searchCategoryPages: MetadataRoute.Sitemap = allCategories.map(category=>({
          url: absoluteURL(`/categories/${category}`),
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
          ...searchTagPages,
          ...searchCategoryPages
     ]
}