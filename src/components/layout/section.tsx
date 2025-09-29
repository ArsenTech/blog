import { cn } from "@/lib/utils";
import React from "react";

export interface SiteSectionProps extends React.ComponentProps<"section">{
     innerWidthClass?: string
}
export default function SiteSection({children, innerWidthClass, className, ...props}: SiteSectionProps){
     return (
          <SiteSection className={cn("scroll-mt-10",className)} {...props}>
               <div className={cn("inner-width",innerWidthClass)}>
                    {children}
               </div>
          </SiteSection>
     )
}