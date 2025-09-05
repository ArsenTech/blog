import BlogHeader from "@/components/blog/blog-header";
import { Badge } from "@/components/ui/badge";
import BlogItem from "../blog/blog-item";
import { IBlogPostBase, IBlogPostFull } from "@/lib/types";
import { useMDXComponents } from "@/mdx-components";
import BlogContent from "../blog/blog-content";
import PostSection from "../blog/blog-post-section";

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
               <BlogContent currTitle={postData.title} mdxContent={content} toc={toc} components={components}/>
               {tags.length!==0 ? (
                    <PostSection sectionTitle="Tags">
                         <div className="flex items-center gap-2">
                              {tags.slice(0,8).map((tag,i)=>(
                                   <Badge key={`tag-${i+1}`}>{tag}</Badge>
                              ))}
                         </div>
                    </PostSection>
               ) : null}
               <PostSection sectionTitle="Comments" collapsible id="comments">
                    TODO: Add Giscus Comments
               </PostSection>
               {relatedPosts.length!==0 ? (
                    <PostSection sectionTitle="Related Posts">
                         <div className="space-y-4 w-full">
                              {relatedPosts.map(post=>(
                                   <BlogItem key={post.slug} postData={post}/>
                              ))}
                         </div>
                    </PostSection>
               ) : null}
          </main>
     )
}