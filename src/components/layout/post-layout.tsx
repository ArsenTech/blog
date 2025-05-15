"use client"
import BlogHeader from "@/components/blog-header";
import BlogContent from "@/components/blog/blog-content";
import SiteSection from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { BlogItemProps } from "../blog/blog-item";
import { BlogWidget, BlogWidgetCard } from "../blog/blog-widget";
import { MAX_RELATED_POSTS, blogs } from "@/lib/constants";

export default function PostLayout({postData}: BlogItemProps){
     const {title, description, content, tags, slug: currentSlug} = postData;
     const relatedPosts = blogs.filter(post=>{
          if(post.slug===currentSlug) return false;
          return post.tags.some(tag=>tags.includes(tag))
     }).slice(0,MAX_RELATED_POSTS)
     return (
          <main>
               <BlogHeader title={title} description={description}/>
               {relatedPosts.length!==0 ? (
                    <SiteSection innerWidthClass="space-y-4 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-3">
                         <BlogContent markdownContent={content}/>
                         <div className="space-y-4 relative md:sticky top-0 lg:top-[85px] h-fit">
                              <BlogWidget title="Related Posts">
                                   {relatedPosts.map(post=>(
                                        <BlogWidgetCard key={post.slug} postData={post}/>
                                   ))}
                              </BlogWidget>
                         </div>
                    </SiteSection>
               ) : (
                    <SiteSection innerWidthClass="w-full">
                         <BlogContent markdownContent={content}/>
                    </SiteSection>
               )}
               <hr className="border-t border-primary border-dashed"/>
               {tags.length!==0 ? (
                    <SiteSection innerWidthClass="space-y-2.5">
                         <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Tags</h3>
                         <div className="flex items-center gap-2">
                              {tags.slice(0,8).map((tag,i)=>(
                                   <Badge key={`tag-${i+1}`}>{tag}</Badge>
                              ))}
                         </div>
                    </SiteSection>
               ) : null}
          </main>
     )
}