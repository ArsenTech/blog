"use client"
import { IBlogPostBase } from "@/lib/types"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import BlogItem from "../blog/item"
import { BlogWidget, BlogWidgetCard } from "../blog/widget"
import SiteSection from "../layout/section"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"
import CollapsibleFilters from "../blog/widget/filters"
import NoSearchResults from "../shrug"

export interface LandingSectionProps{
     entries: IBlogPostBase[],
     featured: IBlogPostBase[],
     categories: string[],
     totalPages: number,
     currentPage: number,
     pageSize: number,
     search: string
     setSearch: React.Dispatch<React.SetStateAction<string>>
     selected: string[]
     setSelected: React.Dispatch<React.SetStateAction<string[]>>
}
export default function LandingSection({entries, search, setSearch, selected, setSelected, featured, categories, currentPage, pageSize, totalPages}: LandingSectionProps){
     const toggleCategory = (category: string) => setSelected(prev=>prev?.includes(category) ? prev.filter(val=>val!==category) : [...(prev||[]),category])
     return entries.length!==0 ? (
          <SiteSection id="blog" innerWidthClass="space-y-4 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
               <div className="space-y-5">
                    <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight border-b border-primary pb-2">{search==="" ? "Latest Posts" : "Search Results"}</h3>
                    {entries.length<=0 ? (
                         <div className="flex !mt-0 flex-col items-center justify-center gap-3 h-full w-full">
                              <NoSearchResults tag={search}/>
                         </div>
                    ) : (
                         <>
                         {entries.map(post=>(
                              <BlogItem key={post.slug} postData={post}/>
                         ))}
                         <PaginationWithLinks
                              page={currentPage}
                              totalCount={totalPages}
                              pageSize={pageSize}
                              navigationMode="link"
                              pageSizeSelectOptions={{
                                   pageSizeOptions: [5,10,25,50,100]
                              }}
                         />
                         </>
                    )}
               </div>
               <div className="space-y-4 relative lg:sticky top-0 lg:top-[85px] h-fit -order-1 lg:order-1">
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
     )
}