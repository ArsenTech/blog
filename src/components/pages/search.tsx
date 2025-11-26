"use client"
import { IBlogPostBase } from "@/lib/types"
import {zodResolver} from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { getBackgroundImage } from "@/lib/utils"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import AppSection from "../site-section"
import { SearchIcon } from "lucide-react"
import SiteSection from "../layout/section"
import { PaginationWithLinks } from "@/components/pagination-with-links"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import NoSearchResults from "../shrug"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { BlogPostsProps } from "../blog-posts"
import PostsLoader from "../loaders/posts"
import { getRangeAsText } from "@/lib/helpers/seo"
import usePaginatedData from "@/hooks/use-pagination"
 
export const searchSchema = z.object({
     query: z.string().trim()
})

function BlogPosts(props: BlogPostsProps) {
     const Inner = dynamic(() => import("../blog-posts"), {
          ssr: false,
          loading: () => <PostsLoader count={props.posts.slice(
               (props.currentPage - 1) * props.pageSize,
               props.currentPage + props.pageSize
          ).length} />
     })
     return <Inner {...props} />
}

interface SearchPropsBase{
     results: IBlogPostBase[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     mode: "tag" | "category"
}

type SearchProps = (SearchPropsBase & {mode: "tag", tag: string}) | (SearchPropsBase & {mode: "category", category: string})

export default function Search(props: SearchProps){
     const {results, totalPages, currentPage, pageSize, mode} = props;
     const keyword = mode==="tag" ? props.tag : props.category;
     const filteredPosts = useMemo(()=>
          mode==="tag"
               ? results.filter(val=>
                    val.tags.some(keyword=>keyword.toLowerCase().includes(keyword.toLowerCase()))
               )
               : results.filter(val=>val.categories.some(c=>c.toLowerCase().includes(keyword.toLowerCase())))
     ,[results, keyword, mode])
     const router = useRouter();
     const entries = usePaginatedData(filteredPosts,currentPage,pageSize);
     const form = useForm<z.infer<typeof searchSchema>>({
          resolver: zodResolver(searchSchema),
          defaultValues: { query: keyword }
     })
     function onSubmit(values: z.infer<typeof searchSchema>) {
          router.push(`/?query=${values.query}&page=1&pageSize=${pageSize}`)
     }
     return (
          <main>
               <AppSection id="banner" className="text-white flex items-center justify-center flex-col gap-5 h-[50vh] md:h-[25vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
                    <h1 className="inline-flex justify-center items-center flex-col gap-3 text-4xl sm:text-5xl lg:text-6xl font-bold">ArsenTech Blog</h1>
                    <p className="text-lg sm:text-xl">
                         {mode === "tag"
                              ? `Top ${results.length} posts tagged with "${keyword}"`
                              : `Top ${results.length} posts in "${keyword}" category`}
                    </p>
               </AppSection>
               {entries.length!==0 ? (
                    <SiteSection className="min-h-[56vh]" id="search" innerWidthClass="flex flex-col items-center justify-center gap-6">
                         <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-3">
                                   <FormField
                                        control={form.control}
                                        name="query"
                                        render={({field})=>(
                                             <FormItem className="w-full">
                                                  <InputGroup>
                                                       <FormControl>
                                                            <InputGroupInput {...field} placeholder="Search tutorials, coding tips..."/>
                                                       </FormControl>
                                                       <InputGroupAddon>
                                                            <SearchIcon/>
                                                       </InputGroupAddon>
                                                       <InputGroupAddon align="inline-end">
                                                            {getRangeAsText(
                                                                 currentPage,
                                                                 pageSize,
                                                                 totalPages
                                                            )}
                                                       </InputGroupAddon>
                                                  </InputGroup>
                                             </FormItem>
                                        )}
                                   />
                              </form>
                         </Form>
                         <div className="space-y-5 w-full">
                              <BlogPosts
                                   posts={entries}
                                   currentPage={currentPage}
                                   pageSize={pageSize}
                              />
                              <PaginationWithLinks
                                   page={currentPage}
                                   totalCount={totalPages}
                                   pageSize={pageSize}
                                   pageSizeSelectOptions={{
                                        pageSizeOptions: [5,10,25,50,100]
                                   }}
                              />
                         </div>
                    </SiteSection>
               ) : (
                    <SiteSection className="min-h-[50vh] flex items-center justify-center" innerWidthClass="flex flex-col items-center justify-center gap-3">
                         <NoSearchResults
                              tag={keyword}
                              form={form}
                              onSubmit={onSubmit}
                         />
                    </SiteSection>
               )}
          </main>
     )
}