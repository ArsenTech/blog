import { TOCItem } from "@/lib/types"
import { MDXComponents } from "mdx/types"
import TableOfContents from "./blog-widget/toc";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { cn } from "@/lib/utils";
import SiteSection from "../layout/section";
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, {Options as RehypePrettyCodeOptions} from "rehype-pretty-code"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Button } from "../ui/button";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";

interface BlogContentProps{
     mdxContent: string,
     toc: TOCItem[],
     components: MDXComponents,
     currTitle: string
}
const options: RehypePrettyCodeOptions = {
     theme: "material-theme-darker",
     bypassInlineCode: true,
};
export default function BlogContent({mdxContent, toc, components, currTitle}: BlogContentProps){
     const hasTableOfContents = toc.length!==0;
     return (
          <SiteSection innerWidthClass={cn("space-y-4",hasTableOfContents && "grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] lg:gap-2 lg:gap-6")}>
               {hasTableOfContents && (
                    <TableOfContents data={toc}/>
               )}
               <article className={cn("prose dark:prose-invert prose-code:after:content-normal prose-code:before:content-none",!hasTableOfContents ? "max-w-full" : "max-w-5xl")}>
                    <div className="not-prose pb-3.5 mb-2 flex items-center justify-between gap-2">
                         <Breadcrumb>
                              <BreadcrumbList>
                                   <BreadcrumbItem>
                                        <BreadcrumbLink href="https://arsentech.github.io/">Home</BreadcrumbLink>
                                   </BreadcrumbItem>
                                   <BreadcrumbSeparator/>
                                   <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Blog</BreadcrumbLink>
                                   </BreadcrumbItem>
                                   <BreadcrumbSeparator/>
                                   <BreadcrumbItem>
                                        <BreadcrumbPage>{currTitle}</BreadcrumbPage>
                                   </BreadcrumbItem>
                              </BreadcrumbList>
                         </Breadcrumb>
                         <Button variant="outline" asChild title="Comments" size="icon">
                              <Link href="#comments"><MessageSquareText/></Link>
                         </Button>
                    </div>
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