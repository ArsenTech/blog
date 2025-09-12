"use client"
import { IBlogPostBase } from "@/lib/types"
import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import BlogItem from "../blog/item"
import SiteSection from "../layout/section"
import { PaginationWithLinks } from "../ui/pagination-with-links"
import { useEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import * as z from "zod"
import { UseFormReturn } from "react-hook-form"
import NoSearchResults from "../shrug"
import { searchSchema } from "../pages/tag-search"
import SearchLoader from "../loaders/search-loader"
import PaginationLoader from "../loaders/ui/pagination"

export interface SearchSectionProps{
     entries: IBlogPostBase[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     tag: string,
     isPending: boolean,
     form: UseFormReturn<z.infer<typeof searchSchema>>,
     onSubmit: (values: z.infer<typeof searchSchema>) => void
}
export default function SearchSection({entries, totalPages, currentPage, tag, pageSize, form, onSubmit, isPending}: SearchSectionProps){
     const [loaded, setLoaded] = useState(false)
     useEffect(()=>{
          setLoaded(true)
     },[])
     return entries.length!==0 ? (
          <SiteSection className="min-h-[56vh]" id="search" innerWidthClass="flex flex-col items-center justify-center gap-6">
               {loaded ? (
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
               ) : <SearchLoader/>}
               <div className="space-y-5 w-full">
                    {entries.map((post,i)=>(
                         <BlogItem key={`${post.slug}-${i+1}`} postData={post}/>
                    ))}
                    {loaded ? (
                         <PaginationWithLinks
                              page={currentPage}
                              totalCount={totalPages}
                              pageSize={pageSize}
                              pageSizeSelectOptions={{
                                   pageSizeOptions: [5,10,25,50,100]
                              }}
                         />
                    ) : <PaginationLoader/>}
               </div>
          </SiteSection>
     ) : (
          <SiteSection className="min-h-[50vh] flex items-center justify-center" innerWidthClass="flex flex-col items-center justify-center gap-3">
               <NoSearchResults tag={tag}/>
          </SiteSection>
     )
}