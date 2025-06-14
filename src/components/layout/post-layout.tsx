"use client"
import BlogHeader from "@/components/blog-header";
import BlogContent from "@/components/blog/blog-content";
import SiteSection, { SiteSectionProps } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import BlogItem, { BlogItemProps } from "../blog/blog-item";
import { cn } from "@/lib/utils";
import { IBlogPost, TOCItem } from "@/lib/types";
import TableOfContents from "../blog/toc";

const PostSection: React.FC<SiteSectionProps & {
     sectionTitle: string,
}> = ({sectionTitle, children, innerWidthClass, ...props}) => (
     <SiteSection innerWidthClass={cn("flex flex-col gap-5 items-start justify-center",innerWidthClass)} {...props}>
          <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight border-b border-primary pb-2">{sectionTitle}</h3>
          {children}
     </SiteSection>
)

interface PostLayoutProps extends BlogItemProps{
     relatedPosts: IBlogPost[],
     toc: TOCItem[]
}
export default function PostLayout({postData, relatedPosts, toc}: PostLayoutProps){
     const {content, tags} = postData;
     const hasTableOfContents = toc.length!==0;
     return (
          <main>
               <BlogHeader data={postData}/>
               <SiteSection innerWidthClass={cn("space-y-4",hasTableOfContents && "grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] lg:gap-2 lg:gap-6")}>
                    {hasTableOfContents && (
                         <TableOfContents data={toc}/>
                    )}
                    <BlogContent markdownContent={content} hasTableOfContents={hasTableOfContents}/>
               </SiteSection>
               {tags.length!==0 ? (
                    <PostSection sectionTitle="Tags">
                         <div className="flex items-center gap-2">
                              {tags.slice(0,8).map((tag,i)=>(
                                   <Badge key={`tag-${i+1}`}>{tag}</Badge>
                              ))}
                         </div>
                    </PostSection>
               ) : null}
               {relatedPosts.length!==0 ? (
                    <PostSection sectionTitle="Related Posts">
                         <div className="space-y-4 w-full">
                              {relatedPosts.map(post=>(
                                   <BlogItem key={post.slug} postData={post}/>
                              ))}
                         </div>
                    </PostSection>
               ) : null}
               {/* TODO: Add Giscus Comments with Collapsible Component */}
          </main>
     )
}