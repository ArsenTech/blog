"use client"
import { useIsMobile } from "@/hooks/use-is-mobile";
import { TOCItem } from "@/lib/types";
import { useMemo, useState } from "react";
import TableOfContents from "./widget/toc";
import BlogAccessibility from "./accessibility";
import { cn } from "@/lib/utils";
import SiteSection from "../layout/section";

interface BlogControlsProps{
     currTitle: string,
     toc: TOCItem[],
     children: React.ReactNode
}
export default function BlogDataWrapper({currTitle, toc, children}: BlogControlsProps){
     const hasTOC = useMemo(()=>toc.length!==0,[toc.length])
     const isTablet = useIsMobile("tablet")
     const [isOpen, setIsOpen] = useState(false);
     return (
          <SiteSection className="!px-0 !pt-10 !pb-0 md:!pb-10" innerWidthClass={cn("space-y-4",hasTOC && "grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] gap-4")} id="blog-content">
               <TableOfContents isTablet={isTablet} data={toc} setIsOpen={setIsOpen} isOpen={isOpen} currTitle={currTitle}/>
               <article className={cn("prose dark:prose-invert prose-code:after:content-normal prose-code:before:content-none !mt-0 relative",!hasTOC ? "max-w-full" : "max-w-5xl")}>
                    <BlogAccessibility hasTOC={hasTOC} currTitle={currTitle} setIsOpen={setIsOpen} isTablet={isTablet}/>
                    <div className="px-1">
                         {children}
                    </div>
               </article>
          </SiteSection>
     )
}