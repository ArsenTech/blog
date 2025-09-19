import { TOCItem } from "@/lib/types"
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, {Options as RehypePrettyCodeOptions} from "rehype-pretty-code"
import BlogDataWrapper from "./data-wrapper";
import { useMDXComponents } from "@/mdx-components";

interface BlogContentProps{
     mdxContent: string,
     toc: TOCItem[],
     currTitle: string
}
const options: RehypePrettyCodeOptions = {
     theme: "material-theme-darker",
     bypassInlineCode: true,
};
export default function BlogContent({mdxContent, toc, currTitle}: BlogContentProps){
     const components = useMDXComponents({})
     return (
          <BlogDataWrapper currTitle={currTitle} toc={toc}>
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
          </BlogDataWrapper>
     )
}