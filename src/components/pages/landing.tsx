"use client"
import { IBlogPostBase } from "@/lib/types"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import BlogItem from "../blog/item"
import { BlogWidget, BlogWidgetCard } from "../blog/widget"
import LandingSection from "../layout/landing-section"
import SiteSection from "../layout/section"
import { PaginationWithLinks } from "../ui/pagination-with-links"
import { useEffect, useMemo, useState } from "react"
import { MAX_FEATURED_POSTS } from "@/lib/constants"
import CollapsibleFilters from "../blog/widget/filters"

interface LandingPageProps{
     posts: IBlogPostBase[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     categories: string[],
     query: string
}
export default function LandingPage({posts, totalPages, currentPage, categories,pageSize, query}: LandingPageProps){
     const [search, setSearch] = useState(query)
     const [selected, setSelected] = useState<string[]>()
     const [loaded, setLoaded] = useState(false)
     useEffect(()=>{
          setLoaded(true)
     },[])
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
          currentPage + pageSize
     )
     const featured = posts.filter(post=>post.featured).slice(0,MAX_FEATURED_POSTS);
     const toggleCategory = (category: string) => setSelected(prev=>prev?.includes(category) ? prev.filter(val=>val!==category) : [...(prev||[]),category])
     return (
          <main>
               <LandingSection/>
               {posts.length!==0 ? (
                    <SiteSection id="blog" innerWidthClass="space-y-4 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-3">
                         <div className="space-y-5">
                              {entries.map(post=>(
                                   <BlogItem key={post.slug} postData={post}/>
                              ))}
                              {loaded && (
                                   <PaginationWithLinks
                                        page={currentPage}
                                        totalCount={totalPages}
                                        pageSize={pageSize}
                                        navigationMode="link"
                                        pageSizeSelectOptions={{
                                             pageSizeOptions: [5,10,25,50,100]
                                        }}
                                   />
                              )}
                         </div>
                         <div className="space-y-4 relative md:sticky top-0 lg:top-[85px] h-fit">
                              <div className="flex items-center gap-3">
                                   <Search className="size-6 shrink-0"/>
                                   <Input type="text" placeholder="Search tutorials, coding tips..." onChange={e=>setSearch(e.target.value)} value={search}/>
                              </div>
                              {featured.length!==0 ? (
                                   <BlogWidget title="Featured Posts">
                                        {featured.map(post=>(
                                             <BlogWidgetCard key={post.slug} postData={post}/>
                                        ))}
                                   </BlogWidget>
                              ) : null}
                              <CollapsibleFilters
                                   tags={categories}
                                   onToggleCategory={toggleCategory}
                                   selected={selected}
                              />
                         </div>
                    </SiteSection>
               ) : (
                    <SiteSection>
                         <p className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-muted-foreground">No blog posts available yet. Check back soon!</p>
                    </SiteSection>
               )}
          </main>
     )
}