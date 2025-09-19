"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MessageSquareText, TableOfContents } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlogAccessibilityProps{
     currTitle: string,
     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
     isTablet: boolean,
     hasTOC: boolean
}
export default function BlogAccessibility({currTitle, setIsOpen, isTablet, hasTOC}: BlogAccessibilityProps){
     const [isSticky, setIsSticky] = useState(false);
     useEffect(()=>{
          function handleScroll(this: Window) {
               setIsSticky(this.scrollY > 545)
          }
          window.addEventListener("scroll",handleScroll)
          return () => {
               window.removeEventListener("scroll",handleScroll)
          }
     },[])
     return (
          <div className={cn("sticky top-[69px] w-full not-prose py-3 mb-5 z-10 px-1.5 flex items-center justify-between gap-2 bg-background border-b transition-all",isSticky ? "border-accent" : "border-transparent")}>
               <Breadcrumb className="w-3/5">
                    <BreadcrumbList className="text-xs sm:text-sm">
                         <BreadcrumbItem>
                              <BreadcrumbLink href="https://arsentech.github.io/">Home</BreadcrumbLink>
                         </BreadcrumbItem>
                         <BreadcrumbSeparator/>
                         <BreadcrumbItem>
                              <BreadcrumbLink href="/">Blog</BreadcrumbLink>
                         </BreadcrumbItem>
                         <BreadcrumbSeparator/>
                         <BreadcrumbItem>
                              <BreadcrumbPage>{currTitle}</BreadcrumbPage>
                         </BreadcrumbItem>
                    </BreadcrumbList>
               </Breadcrumb>
               <div className="flex items-center gap-2.5">
                    {(isTablet && hasTOC) && <Button variant="secondary" title="Table of Contents" size="icon" onClick={()=>setIsOpen(true)}>
                         <TableOfContents/>
                    </Button>}
                    <Button variant="secondary" asChild title="Interactions" size="icon">
                         <Link href="#interactions"><MessageSquareText/></Link>
                    </Button>
               </div>
          </div>
     )
}