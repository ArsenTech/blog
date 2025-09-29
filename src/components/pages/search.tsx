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
     const router = useRouter()
     const entries = filteredPosts.slice(
          (currentPage - 1) * pageSize,
          currentPage + pageSize
     )
     const form = useForm<z.infer<typeof searchSchema>>({
          resolver: zodResolver(searchSchema),
          defaultValues: { query: keyword }
     })
     function onSubmit(values: z.infer<typeof searchSchema>) {
          router.push(`/?query=${values.query}&page=1&pageSize=${pageSize}`)
     }
     return (
          <main>
               <section id="banner" className="text-white flex items-center justify-center flex-col gap-5 h-[50vh] md:h-[25vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
                    <h1 className="inline-flex justify-center items-center flex-col gap-3 text-4xl sm:text-5xl lg:text-6xl font-bold">ArsenTech Blog</h1>
                    <p className="text-lg sm:text-xl">
                         {mode === "tag"
                              ? `Top ${results.length} posts tagged with "${keyword}"`
                              : `Top ${results.length} posts in "${keyword}" category`}
                    </p>
               </section>
               <SearchResultsSection
                    entries={entries}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    tag={keyword}
                    form={form}
                    onSubmit={onSubmit}
               />
          </main>
     )
}