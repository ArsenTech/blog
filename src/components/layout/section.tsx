import { cn } from "@/lib/utils";
import React from "react";

interface SiteSectionProps extends React.ComponentProps<"section">{
     innerWidthClass?: string
}
export default function SiteSection({children, innerWidthClass, className, ...props}: SiteSectionProps){
     return (
          <section className={cn("scroll-mt-12",className)} {...props}>
               <div className={cn("inner-width",innerWidthClass)}>
                    {children}
               </div>
          </section>
     )
}