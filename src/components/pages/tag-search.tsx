"use client"
import { IBlogPostBase } from "@/lib/types"
import {zodResolver} from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { getBackgroundImage } from "@/lib/utils"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { useForm } from "react-hook-form"
import SearchResultsLoader from "../loaders/search-loader"
import dynamic from "next/dynamic"
import { SearchSectionProps } from "../sections/search"
 
export const searchSchema = z.object({
     query: z.string().trim()
})

export function SearchResultsSection(props: SearchSectionProps) {
     const Inner = dynamic(() => import("../sections/search"), {
          ssr: false,
          loading: () => <SearchResultsLoader count={props.entries.slice(
               (props.currentPage - 1) * props.pageSize,
               props.currentPage + props.pageSize
          ).length} />
     })
     return <Inner {...props} />
}

interface TagSearchProps{
     results: IBlogPostBase[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     tag: string
}
export default function TagSearch({results, totalPages, currentPage, tag, pageSize}: TagSearchProps){
     const filteredPosts = useMemo(()=>{
          const currPosts = results.filter(val=>val.tags.some(tag=>tag.toLowerCase().includes(tag.toLowerCase())))
          return currPosts
     },[results])
     const router = useRouter()
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
          router.push(`/?query=${values.query}&page=1&pageSize=${pageSize}`)
     }
     return (
          <main>
               <section id="banner" className="text-white flex items-center justify-center flex-col gap-5 h-[20vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
                    <h1 className="inline-flex justify-center items-center flex-col gap-3 text-4xl sm:text-5xl lg:text-6xl font-bold">ArsenTech Blog</h1>
                    <p className="text-lg sm:text-xl">Top {results.length} posts tagged with &quot;{tag}&quot;</p>
               </section>
               <SearchResultsSection
                    entries={entries}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    tag={tag}
                    form={form}
                    onSubmit={onSubmit}
               />
          </main>
     )
}