"use client"
import { IBlogPostBase } from "@/lib/types"
import { getBackgroundImage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rss } from "lucide-react";
import { useMemo, useState } from "react"
import { MAX_FEATURED_POSTS } from "@/lib/constants"
import LandingLoader from "../loaders/landing-loader"
import dynamic from "next/dynamic"
import { LandingSectionProps } from "../sections/landing";
import LandingH1 from "../h1-animated-text";
import SiteSection from "../site-section";

interface LandingPageProps{
     posts: IBlogPostBase[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     categories: string[],
     query: string,
}

export function LandingSection(props: LandingSectionProps) {
     const Inner = dynamic(() => import("../sections/landing"), {
          ssr: false,
          loading: () => <LandingLoader count={props.entries.slice(
               (props.currentPage - 1) * props.pageSize,
               props.currentPage + props.pageSize
          ).length} />
     })
     return <Inner {...props} />
}

export default function LandingPage({posts, totalPages, currentPage, categories,pageSize, query}: LandingPageProps){
     const [search, setSearch] = useState(query)
     const [selected, setSelected] = useState<string[]>([])
     const filteredPosts = useMemo(()=>{
          const currPosts = posts.filter(val=>
               val.title.toLowerCase().includes(search.toLowerCase()) ||
               val.tags.some(tag=>tag.toLowerCase().includes(search.toLowerCase())) ||
               val.description.toLowerCase().includes(search.toLowerCase())
          )
          const flairFilters = (selected && selected.length!==0)
               ? currPosts.filter(post=>
                    selected.every(category=>
                         post.categories.includes(category)
                    )
               ): currPosts;
          return flairFilters;
     },[search,posts,selected])
     const entries = filteredPosts.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
     )
     const featured = posts.filter(post=>post.featured).slice(0,MAX_FEATURED_POSTS);
     return (
          <main>
               <SiteSection id="banner" className="text-white flex items-center justify-center flex-col gap-5 h-screen min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
                    <LandingH1/>
                    <p className="text-lg sm:text-xl">Learn about cybersecurity, tech tutorials, unique coding projects, and other tech-related posts all in one place.</p>
                    <div className="flex items-center gap-2">
                         <Button size="lg" variant="outline" asChild>
                              <Link href="#blog">Explore blog</Link>
                         </Button>
                         <Button className="size-10" variant="secondary" asChild>
                              <Link href="/rss.xml"><Rss/></Link>
                         </Button>
                    </div>
               </SiteSection>
               <LandingSection
                    entries={entries}
                    featured={featured}
                    categories={categories}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    search={search}
                    setSearch={setSearch}
                    selected={selected}
                    setSelected={setSelected}
               />
          </main>
     )
}