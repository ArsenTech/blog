import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { IBlogPostBase } from "@/lib/types";

export interface BlogItemProps{
     postData: IBlogPostBase
}
export default function BlogItem({postData}: BlogItemProps){
     const {title, description, slug, date} = postData
     return (
          <div className="space-y-3 pb-3 mb-3 border-b last:border-b-0 last:pb-0 last:mb-0">
               <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
               <p className="text-sm text-muted-foreground">{description}</p>
               <div className="flex justify-between items-center gap-4">
                    <p className="flex items-center gap-2 font-medium"><Calendar className="size-5"/>{format(date,"LLL do, yyyy")}</p>
                    <Button asChild variant="ghost">
                         <Link href={`/posts/${slug}`}>Read more <ArrowRight/></Link>
                    </Button>
               </div>
          </div>
     )
}