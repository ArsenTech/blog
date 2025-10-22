import { IBlogPostBase } from "@/lib/types";
import { getBackgroundImage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import SiteSection from "../site-section";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface BlogHeaderProps{
     data: IBlogPostBase
}
export default function BlogHeader({data}: BlogHeaderProps){
     const {title,description,author,date} = data
     return (
          <SiteSection className="text-white flex items-center justify-center flex-col gap-5 h-screen md:h-[45vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{title}</h1>
               <p className="text-lg sm:text-xl">{description}</p>
               <div className="flex items-center justify-center gap-5 flex-wrap text-base sm:text-lg md:text-xl">
                    <span className="flex items-center gap-2.5"><User/>{author}</span>
                    <span className="flex items-center gap-2.5"><Calendar className="size-5"/>{format(date,"LLL do, yyyy")}</span>
               </div>
               {data.categories.length!==0 ? (
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                         {data.categories.map(category=>(
                              <Badge
                                   className="cursor-pointer text-base" 
                                   key={category.toLowerCase()}
                              >
                                   <Link href={`/categories/${category.toLowerCase()}`}>{category}</Link>
                              </Badge>
                         ))}
                    </div>
               ) : null}
          </SiteSection>
     )
}