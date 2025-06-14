import { IBlogPost } from "@/lib/types";
import { getBackgroundImage } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface BlogHeaderProps{
     data: IBlogPost
}
export default function BlogHeader({data}: BlogHeaderProps){
     const {title,description} = data
     return (
          <section className="text-white flex items-center justify-center flex-col gap-5 h-[45vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{title}</h1>
               <p className="text-lg sm:text-xl">{description}</p>
               {data.categories.length!==0 ? (
                    <div className="flex items-center gap-2 flex-wrap">
                         {data.categories.map(category=>(
                              <Badge
                                   className="cursor-pointer text-base" 
                                   key={category.toLowerCase()}
                              >
                                   {category}
                              </Badge>
                         ))}
                    </div>
               ) : null}
          </section>
     )
}