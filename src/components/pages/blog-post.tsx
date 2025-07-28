import BlogHeader from "@/components/blog-header";
import SiteSection, { SiteSectionProps } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import BlogItem from "../blog/blog-item";
import { cn } from "@/lib/utils";
import { IBlogPostBase, IBlogPostFull } from "@/lib/types";
import { useMDXComponents } from "@/mdx-components";
import BlogContent from "../blog/blog-content";

const PostSection: React.FC<SiteSectionProps & {
     sectionTitle: string,
}> = ({sectionTitle, children, innerWidthClass, ...props}) => (
     <SiteSection innerWidthClass={cn("flex flex-col gap-5 items-start justify-center",innerWidthClass)} {...props}>
          <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight border-b border-primary pb-2">{sectionTitle}</h3>
          {children}
     </SiteSection>
)

interface BlogPostProps {
     postData: IBlogPostFull
     relatedPosts: IBlogPostBase[],
}
export default function BlogPost({postData, relatedPosts}: BlogPostProps){
     const {content, tags, toc} = postData;
     const components = useMDXComponents({})
     return (
          <main>
               <BlogHeader data={postData}/>
               <BlogContent mdxContent={content} toc={toc} components={components}/>
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