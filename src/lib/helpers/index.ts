import { TOCItem, IBlogPostBase, IBlogPostFull } from "@/lib/types";
import {unified} from "unified"
import remarkParse from "remark-parse"
import {visit} from "unist-util-visit"
import type {Heading} from "mdast"
import {toString} from "mdast-util-to-string"
import GithubSlugger from "github-slugger"
import matter from "gray-matter"
import fs from "fs";
import { MAX_RELATED_POSTS } from "../constants";
import path from "path";

const postsFolder = path.join(process.cwd(), "src", "posts");

export default function extractTOC(content: string): TOCItem[]{
     const {content: mdxContent} = matter(content);
     const tree = unified().use(remarkParse).parse(mdxContent);
     const headings: TOCItem[] = [];
     const slugger = new GithubSlugger();
     visit(tree,"heading",(node: Heading)=>{
          const text = toString(node);
          if(!text) return;
          const id = slugger.slug(text)
          headings.push({ id, text, level: node.depth })
     })
     return headings
}

export const getAllPosts = async(): Promise<IBlogPostBase[]> => {
     const files = fs.readdirSync(postsFolder);
     const posts = await Promise.all(
          files.map(async file =>{
               const blog = await getPostBySlug(path.parse(file).name.replace(".mdx", ""))
               if(!blog) return null
               // eslint-disable-next-line @typescript-eslint/no-unused-vars
               const {content, toc, ...rest} = blog;
               return rest
          })
     );
     return posts.filter((post): post is IBlogPostBase=> post !== null && post.published)
}

export const getPostBySlug = async(slug: string): Promise<IBlogPostFull | null> => {
     try {
          const fullPath = path.join(postsFolder, `${slug}.mdx`);
          const contents = await fs.promises.readFile(fullPath, "utf8");
          const toc = extractTOC(contents);
          const { data: frontmatter, content } = matter(contents)
          return {
               title: frontmatter.title,
               slug: path.parse(fullPath).name.replace(".mdx", ""),
               description: frontmatter.description,
               date: new Date(frontmatter.date),
               tags: frontmatter.tags ?? [],
               categories: frontmatter.categories ?? [],
               published: frontmatter.published ?? true,
               featured: frontmatter.featured ?? false,
               toc,
               content
          };
     } catch (e) {
          console.error(`Failed to load post: ${slug}`);
          console.error(e);
          return null;
     }
}

export const getRelatedPosts = async(currentSlug: string, tags: string[]): Promise<IBlogPostBase[]> => {
     const posts = await getAllPosts()
     return posts.filter(post=>{
          if(!post || post.slug===currentSlug) return false;
          return post.tags.some(tag=>tags.includes(tag))
     }).filter(post=>post!==null).slice(0,MAX_RELATED_POSTS)
}

export async function getCategories<T extends IBlogPostBase>(posts?: ReadonlyArray<T>): Promise<string[]>{
     const arr = !posts ? await getAllPosts() : posts
     return [...new Set(arr.flatMap(val=>!val ? [] : val.categories))]
}

export async function getPostsByTag(tag: string){
     const posts = await getAllPosts()
     return posts.filter(post=>post.tags.includes(tag))
}