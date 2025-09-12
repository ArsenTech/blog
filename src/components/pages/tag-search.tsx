"use client"
import { IBlogPostBase } from "@/lib/types"
import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import BlogItem from "../blog/item"
import {zodResolver} from "@hookform/resolvers/zod"
import SiteSection from "../layout/section"
import { PaginationWithLinks } from "../ui/pagination-with-links"
import { useEffect, useMemo, useState, useTransition } from "react"
import { getBackgroundImage } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import NoSearchResults from "../shrug"
 
const searchSchema = z.object({
     query: z.string().trim()
})

interface TagSearchProps{
     results: IBlogPostBase[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     tag: string
}
export default function TagSearch({results, totalPages, currentPage, tag, pageSize}: TagSearchProps){
     const [loaded, setLoaded] = useState(false)
     useEffect(()=>{
          setLoaded(true)
     },[])
     const filteredPosts = useMemo(()=>{
          const currPosts = results.filter(val=>val.tags.some(tag=>tag.toLowerCase().includes(tag.toLowerCase())))
          return currPosts
     },[results])
     const router = useRouter()
     const [isPending, startTransition] = useTransition()
     const entries = filteredPosts.slice(
          (currentPage - 1) * pageSize,
          currentPage + pageSize
     )
     const form = useForm<z.infer<typeof searchSchema>>({
          resolver: zodResolver(searchSchema),
          defaultValues: {
               query: tag
          }
     })
     function onSubmit(values: z.infer<typeof searchSchema>) {
          startTransition(()=>{
               router.push(`/?query=${values.query}&page=1&pageSize=${pageSize}`)
          })
     }
     return (
          <main>
               <section id="banner" className="text-white flex items-center justify-center flex-col gap-5 h-[20vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
                    <h1 className="inline-flex justify-center items-center flex-col gap-3 text-4xl sm:text-5xl lg:text-6xl font-bold">ArsenTech Blog</h1>
                    <p className="text-lg sm:text-xl">Top {results.length} posts tagged with &quot;{tag}&quot;</p>
               </section>
               {results.length!==0 ? (
                    <SiteSection className="min-h-[56vh]" id="search" innerWidthClass="flex flex-col items-center justify-center gap-6">
                         {loaded && (
                              <Form {...form}>
                                   <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-3">
                                        {isPending ? <Loader2 className="size-6 shrink-0 text-muted-foreground animate-spin"/> : <Search className="size-6 shrink-0"/>}
                                        <FormField
                                             control={form.control}
                                             name="query"
                                             render={({field})=>(
                                                  <FormItem className="w-full">
                                                       <FormControl>
                                                            <Input {...field} placeholder="Search tutorials, coding tips..." disabled={isPending}/>
                                                       </FormControl>
                                                  </FormItem>
                                             )}
                                        />
                                   </form>
                              </Form>
                         )}
                         <div className="space-y-5 w-full">
                              {entries.map((post,i)=>(
                                   <BlogItem key={`${post.slug}-${i+1}`} postData={post}/>
                              ))}
                              {loaded && (
                                   <PaginationWithLinks
                                        page={currentPage}
                                        totalCount={totalPages}
                                        pageSize={pageSize}
                                        pageSizeSelectOptions={{
                                             pageSizeOptions: [5,10,25,50,100]
                                        }}
                                   />
                              )}
                         </div>
                    </SiteSection>
               ) : (
                    <SiteSection className="min-h-[50vh] flex items-center justify-center" innerWidthClass="flex flex-col items-center justify-center gap-3">
                         <NoSearchResults tag={tag}/>
                    </SiteSection>
               )}
          </main>
     )
}