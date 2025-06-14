import fs from "fs";
import { BlogPostMetadata, IBlogPost } from "./types";
import matter from "gray-matter";
import { MAX_RELATED_POSTS } from "./constants";
import { TOCItem } from "@/lib/types";
import {unified} from "unified"
import remarkParse from "remark-parse"
import {visit} from "unist-util-visit"
import type {Heading} from "mdast"
import GithubSlugger from "github-slugger"
import path from "path";

export default function extractTOC(content: string): TOCItem[]{
     const tree = unified().use(remarkParse).parse(content);
     const headings: TOCItem[] = [];
     const slugger = new GithubSlugger();
     visit(tree,"heading",(node: Heading)=>{
          const text = [...node.children].filter(child=>child.type==="text").map(child=>child.value).join("");
          if(!text) return;
          const id = slugger.slug(text)
          headings.push({ id, text, level: node.depth })
     })
     return headings
}

export const getAllPosts = (): IBlogPost[] => {
     const folder = path.join(process.cwd(), "src/posts");
     if (!fs.existsSync(folder)) {
          console.warn("src/posts does not exist on the server.");
          return [];
     }
     const files = fs.readdirSync(folder)
     const markdownPosts = files.filter(val=>val.endsWith(".md"));
     return markdownPosts.map(slug=>{
          const fileContents = fs.readFileSync(`${folder}/${slug}`, "utf8");
          const frontmatter = matter(fileContents)
          const {published, featured, ...metadata} = frontmatter.data as BlogPostMetadata;
          return {
               ...metadata,
               published: published ?? true,
               featured: featured ?? false,
               slug: slug.replace(".md",""),
               content: frontmatter.content
          }
     }).filter(val=>val.published)
}

export const getPostBySlug = (slug: string) => {
     const posts = getAllPosts();
     const post = posts.find(val=>val.slug===slug);
     return !post ? null : post
}

export const getRelatedPosts = (currentSlug: string, tags: string[]) => {
     const posts = getAllPosts()
     return posts.filter(post=>{
          if(post.slug===currentSlug) return false;
          return post.tags.some(tag=>tags.includes(tag))
     }).slice(0,MAX_RELATED_POSTS)
}

export function getCategories<T extends IBlogPost>(posts?: ReadonlyArray<T>): string[]{
     const arr = !posts ? getAllPosts() : posts
     return [...new Set(arr.flatMap(val=>val.categories))]
}