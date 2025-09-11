"use client"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "./footer"
import Header from "./header"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PageLayoutProps{
     children: React.ReactNode,
     includeProgress?: boolean
}
export default function PageLayout({children, includeProgress=false}: PageLayoutProps){
     const [isSticky, setIsSticky] = useState(false);
     useEffect(()=>{
          function handleScroll(this: Window) {
               setIsSticky(this.scrollY > 100)
          }
          window.addEventListener("scroll",handleScroll)
          return () => {
               window.removeEventListener("scroll",handleScroll)
          }
     },[])
     return (
          <div className="flex min-h-screen flex-col font-[family-name:var(--font-sora)] relative">
               <Header includeProgress={includeProgress}/>
                    {children}
               <Footer/>
               <Button onClick={()=>window.scrollTo({ top:0, left:0, behavior:"smooth" })} size="icon" className={cn("transition-all fixed right-7 z-10",isSticky ? "bottom-6 visible" : "bottom-0 invisible opacity-0")} title="Scroll to top">
                    <ChevronUp />
               </Button>
          </div>
     )
}