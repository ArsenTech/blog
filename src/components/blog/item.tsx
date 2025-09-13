"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { IBlogPostBase } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-is-mobile";

export interface BlogItemProps{
     postData: IBlogPostBase
}
export default function BlogItem({postData}: BlogItemProps){
     const {title, description, slug, date} = postData;
     const isMobile = useIsMobile();
     return (
          <div className="space-y-3 pb-3 mb-3 border-b border-b-accent last:border-b-0 last:pb-0 last:mb-0">
               <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold"><Link href={`/posts/${slug}`}>{title}</Link></h2>
               <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
               <div className="flex justify-between items-center gap-4">
                    <p className="text-sm md:text-md lg:text-base flex items-center gap-2 font-medium"><Calendar className="size-5"/>{format(date,"LLL do, yyyy")}</p>
                    {!isMobile ? (
                         <Button asChild variant="ghost">
                              <Link href={`/posts/${slug}`}>Read more <ArrowRight/></Link>
                         </Button>
                    ) : (
                         <Button asChild variant="ghost" size="icon" title="Read More">
                              <Link href={`/posts/${slug}`}><ArrowRight/></Link>
                         </Button>
                    )}
               </div>
          </div>
     )
}