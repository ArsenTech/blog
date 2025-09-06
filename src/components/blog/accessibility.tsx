"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlogAccessibilityProps{
     currTitle: string
}
export default function BlogAccessibility({currTitle}: BlogAccessibilityProps){
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
          <div className={cn("sticky top-[69px] w-full not-prose py-3 px-1.5 flex items-center justify-between gap-2 bg-background border-b transition-all",isSticky ? "border-accent" : "border-transparent")}>
               <Breadcrumb>
                    <BreadcrumbList>
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
               <Button variant="secondary" asChild title="Comments" size="icon">
                    <Link href="#comments"><MessageSquareText/></Link>
               </Button>
          </div>
     )
}