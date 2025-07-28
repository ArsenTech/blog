import { TOCItem } from "@/lib/types"
import { MDXComponents } from "mdx/types"
import TableOfContents from "../blog/toc";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { cn } from "@/lib/utils";
import SiteSection from "../layout/section";
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, {Options as RehypePrettyCodeOptions} from "rehype-pretty-code"

interface BlogContentProps{
     mdxContent: string,
     toc: TOCItem[],
     components: MDXComponents
}
const options: RehypePrettyCodeOptions = {
     theme: "material-theme-darker",
     bypassInlineCode: true,
};
export default function BlogContent({mdxContent, toc, components}: BlogContentProps){
     const hasTableOfContents = toc.length!==0;
     return (
          <SiteSection innerWidthClass={cn("space-y-4",hasTableOfContents && "grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] lg:gap-2 lg:gap-6")}>
               {hasTableOfContents && (
                    <TableOfContents data={toc}/>
               )}
               <article className={cn("prose dark:prose-invert prose-code:after:content-normal prose-code:before:content-none",!hasTableOfContents ? "max-w-full" : "max-w-5xl")}>
                    <MDXRemote
                         source={mdxContent}
                         components={components}
                         options={{
                              mdxOptions: {
                                   remarkPlugins: [remarkGfm],
                                   rehypePlugins: [
                                        rehypeAutolinkHeadings,
                                        rehypeSlug,
                                        [rehypePrettyCode, options]
                                   ],
                              }
                         }}
                    />
               </article>
          </SiteSection>
     )
}