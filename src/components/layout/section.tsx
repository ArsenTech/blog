import { cn } from "@/lib/utils";
import React from "react";

interface SiteSectionProps extends React.ComponentProps<"section">{
     innerWidthClass?: string
}
export default function SiteSection({children, innerWidthClass, ...props}: SiteSectionProps){
     return (
          <section {...props}>
               <div className={cn("inner-width",innerWidthClass)}>
                    {children}
               </div>
          </section>
     )
}