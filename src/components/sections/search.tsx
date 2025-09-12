"use client"
import { IBlogPostBase } from "@/lib/types"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import BlogItem from "../blog/item"
import SiteSection from "../layout/section"
import { PaginationWithLinks } from "../ui/pagination-with-links"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import * as z from "zod"
import { UseFormReturn } from "react-hook-form"
import NoSearchResults from "../shrug"
import { searchSchema } from "../pages/tag-search"

export interface SearchSectionProps{
     entries: IBlogPostBase[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     tag: string,
     form: UseFormReturn<z.infer<typeof searchSchema>>,
     onSubmit: (values: z.infer<typeof searchSchema>) => void
}
export default function SearchSection({entries, totalPages, currentPage, tag, pageSize, form, onSubmit}: SearchSectionProps){
     return entries.length!==0 ? (
          <SiteSection className="min-h-[56vh]" id="search" innerWidthClass="flex flex-col items-center justify-center gap-6">
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-3">
                         <Search className="size-6 shrink-0"/>
                         <FormField
                              control={form.control}
                              name="query"
                              render={({field})=>(
                                   <FormItem className="w-full">
                                        <FormControl>
                                             <Input {...field} placeholder="Search tutorials, coding tips..."/>
                                        </FormControl>
                                   </FormItem>
                              )}
                         />
                    </form>
               </Form>
               <div className="space-y-5 w-full">
                    {entries.map((post,i)=>(
                         <BlogItem key={`${post.slug}-${i+1}`} postData={post}/>
                    ))}
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
               <NoSearchResults tag={tag}/>
          </SiteSection>
     )
}